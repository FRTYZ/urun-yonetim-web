export interface ParametersProps {
    method?: string,
    url?: string,
    formData?: FormData | null
}

export interface Options {
    method?: string;
    headers?: {};
    body?: FormData | undefined;
}

/*
    Management Request for everyone
*/
export async function Request(parameters: ParametersProps): Promise <any> {
    const {method, url, formData} = parameters

    const EndPoint = import.meta.env.VITE_ENDPOINT;
    const appEndpoint = EndPoint + url;
    
    const options: Options = {
        method: method
    }

    if (method == 'POST' || method == 'PUT' || method == "PATCH") {
        options.body = formData ? formData : undefined;
    }
   
    const response: Response = await fetch(appEndpoint, options);

    console.log(response)

    if ((response.status == 401 || response.status == 403)) {
        return await Request(parameters);
    }

    const data = await response.json();

    return data;
}