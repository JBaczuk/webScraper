const axios = require('axios')
const cheerio = require('cheerio')

function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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
    const emails = []
    const $ = cheerio.load(html)
    const anchorTags = $('a')
    anchorTags.each((i, a) => {
        const text = $(a).text()
        if (isEmail(text)) {
            emails.push(text)
        }
    })
    return emails
}

const runProgram = async () => {
    const url = 'https://crossfitnyc.com'
    const html = await fetchPage(url)
    const emails = extractEmails(html)
    console.log('emails', emails)
}

runProgram()