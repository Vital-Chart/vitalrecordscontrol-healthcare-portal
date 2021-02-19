export async function fetchAPI({ endpoint, method = 'post', body = {} }) {
    try {
        const options = {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }

        const response = await fetch(`/api/${endpoint}`, options)
        const data = await response.json()

        return data
    } catch (error) {
        console.log('catch (fetchAPI)', error)

        return {
            inError: true,
            errorNumber: [100000],
            errorMessage: error,
        }
    }
}

export async function createRequest(data) {
    return await fetchAPI({
        endpoint: 'request',
        method: 'post',
        body: data,
    })
}
