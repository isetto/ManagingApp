const api_url = "http://localhost:38002";

export function downloadRaports(user) {
    return fetch(`${api_url}/downloadReports`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch((error) => {
            console.log(error)
        })
}

export function downloadAllRaports() {
    return fetch(`${api_url}/downloadReports`).then(res => res.json())
        .catch((error) => {
            console.log(error)
        })
}

export function downloadButtons(permissions) {
    return fetch(`${api_url}/downloadButtons`, {
        method: 'POST',
        body: JSON.stringify(permissions),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch((err) => {
            console.log(err)
        })

}

export function downloadSingleRaport(id) {
    return fetch(`${api_url}/downloadReport/${id}`).then(res => res.json())
        .catch((error) => {
            console.log(error)
        })
}

export function singIn(user) {
    return fetch(`${api_url}/signIn`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(async res => {
        let clone = res.clone();
        const check = await res.text()

        if (check !== "wrong") {

            return clone.json()
        }
        else {
            return "wrong"
        }
    })
        .catch((error) => {
            console.log(error)
        })
}

export function updateRaport(id, raport) {
    return fetch(`${api_url}/updateReport/${id}`, {
        method: 'PUT',
        body: JSON.stringify(raport),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch((error) => {
            console.log(error)
        })
}
export function updateButtons(permissions, buttons) {
    return fetch(`${api_url}/updateButtons/${permissions}`, {
        method: 'PUT',
        body: JSON.stringify(buttons),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch((error) => {
            console.log(error)
        })
}



export function deleteRaport(id) {
    return fetch(`${api_url}/deleteReport/${id}`, {
        method: 'DELETE'
    })
        .catch((error) => {
            console.log(error)
        })
}