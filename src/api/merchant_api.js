export const uploadImages = async (dataToUpload) => {
    const url = 'http://localhost:3000/uploadimages';
    const options = {
        method: 'POST',
        body: dataToUpload
    }

    const response = await fetch(url, options)
    const body = await response.json()
    return {success: response.ok, ...body};
}

export const uploadForm = async (dataToUpload, merchantID) => {
    const url = `http://localhost:3000/api/merchant/${merchantID}/addproduct`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToUpload)
    }

    const response = await fetch(url, options);
    const body = await response.json()
    return {success: response.ok, ...body};
}