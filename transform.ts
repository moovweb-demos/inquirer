import * as cheerio from 'cheerio'
import library from './lib/library'
import responseBodyToString from '@edgio/core/utils/responseBodyToString'

export default function transform(response, request) {

  if (response) {
    const $ = cheerio.load(responseBodyToString(response))

    const l = new library($)

    // l.initEdgio()
    // l.deferImages()
    // l.deferScripts()

    // Home
    if (request.path == '/') {
    }

    // PLP
    if (request.path.includes('/path/to/plp')) {
    }

    // PDP
    if (request.path.includes('/path/to/pdp')) {
    }

    $('body').css('background', 'yellow')

    response.body = $.html()
    // .replace(/\{ display\: none\; \}/g, '{}')
    // .replace(/https?:\/\/www.inquirer.net\//g, '/')
    // .replace(/https?:\/\/www\.ikea\.com\//g, '/l0-image/')
    // .replace(/https?:\/\/images\.footballfanatics\.com/g, '/l0-image')
  }
}
