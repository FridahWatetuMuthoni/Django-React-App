import {useEffect} from 'react';
import axios, {axiosPrivate} from '../api/axios';
import useAuth from './useAuth';

//Interceptors are a feature that allows an application to intercept requests or responses before they are handled by the .then() or the .catch().


function useAxiosPrivate() {
    const baseUrl = 'dj-rest-auth/token/refresh/'
    const { authTokens,setAuthTokens } = useAuth();
    const refresh_token = authTokens?.refresh


    useEffect(()=>{
        //interceptors are like javascript event listeners
        //request interceptor: - It allows you to write or execute a piece of your code before the request gets sent.
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization']=`Bearer ${authTokens?.access}`;
                }
            return config;

            }, (error)=> Promise.reject(error)
        )

        //response interceptor: - It allows you to write or execute a piece of your code before response reaches the calling end.
        const responseIntercept = axiosPrivate.interceptors.response.use(
            //if the response is good we just return the response back
            response =>{
                return response;
            },
            //if it has expired
            async (error) => {
                const prevRequest = error?.config;
                if(error.response){
                    if(error.response.status === 401 && !prevRequest._retry){
                        prevRequest._retry = true
                        try{
                            const response = await axios.post(baseUrl,{"refresh":refresh_token},{
                            withCredentials:true
                             });
                             console.log( response?.data?.access)
                            prevRequest.headers['Authorization']=`Bearer ${response?.data?.access}`;
                            setAuthTokens((prev)=>{
                                return {...prev,access:response?.data?.access}
                            });
                            return axiosPrivate(prevRequest);
                        }
                        catch(error){
                            console.log(error)
                        }
                    }
                }

            }
        );
        //using the cleanup function to remove the interceptor so that they can not pile on
        return()=>{
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.response.eject(requestIntercept);
        }
    },[refresh_token,setAuthTokens,authTokens])

  return axiosPrivate;
}

export default useAxiosPrivate;