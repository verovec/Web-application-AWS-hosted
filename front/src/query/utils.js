export const API_URL = window.location.hostname === "localhost" ? "http://0.0.0.0:8080" : "http://d38wiu8dqsk44.cloudfront.net:80";

export const apiRequest = async ({
                                     url,
                                     method = "GET",
                                     body,
                                     headers,
                                 }) => {
    const requestOptions = {
        method,
        headers,
        body: JSON.stringify(body),
    };

    return fetch(url, requestOptions).then((response) =>
        response ? response.json() : {}
    );
};