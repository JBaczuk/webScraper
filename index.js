const axios = require('axios')

/**
 * Returns an html string of a page
 * @param {*} url 
 */
async function fetchPage(url) {
    const response = await axios.get(url)
    if (response.status === 200) {
        const html = response.data
        return html
    }
}

function extractEmails(html) {
    const emails = html.match(/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g)
    const uniqueEmails = [...new Set(emails)]
    return uniqueEmails
}

const runProgram = async () => {
    const url = 'https://crossfitnyc.com'
    const html = await fetchPage(url)
    const emails = extractEmails(html)
    console.log('emails', emails)
}

runProgram()