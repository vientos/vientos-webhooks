const execFile = require('child_process').execFile

const GIT_REF = process.env.GIT_REF
const SCRIPTS_PATH = process.env.SCRIPTS_PATH

const config = {
  path: '/callback',
  port: process.env.PORT,
  secret: process.env.WEBHOOKS_SECRET
}
const gh = require('githubhook')(config)

// Increase maxBuffer from 200*1024 to 1024*1024
const execOptions = {
  maxBuffer: 1024 * 1024 // 1mb
}

gh.listen()

gh.on('push:vientos-app:' + GIT_REF, (data) => {
  console.log('APP')
  execFile(`${SCRIPTS_PATH}/update-app`, execOptions, (err, stdout, stderr) => {
    if (err) console.log(err)
    if (stderr) console.log(stderr)
    console.log(stdout)
  })
})

gh.on('push:vientos-service:' + GIT_REF, (data) => {
  console.log('SERVICE')
  execFile(`${SCRIPTS_PATH}/update-service`, execOptions, (err, stdout, stderr) => {
    if (err) console.log(err)
    if (stderr) console.log(stderr)
    console.log(stdout)
  })
})

gh.on('push:vientos-idp:' + GIT_REF, (data) => {
  console.log('IDP')
  execFile(`${SCRIPTS_PATH}/update-idp`, execOptions, (err, stdout, stderr) => {
    if (err) console.log(err)
    if (stderr) console.log(stderr)
    console.log(stdout)
  })
})

gh.on('push:vientos-website:' + GIT_REF, (data) => {
  console.log('WEBSITE')
  execFile(`${SCRIPTS_PATH}/update-website`, execOptions, (err, stdout, stderr) => {
    if (err) console.log(err)
    if (stderr) console.log(stderr)
    console.log(stdout)
  })
})

gh.on('push:vientos-webhooks:' + GIT_REF, (data) => {
  console.log('WEBHOOKS')
  execFile(`${SCRIPTS_PATH}/update-webhooks`, execOptions, (err, stdout, stderr) => {
    if (err) console.log(err)
    if (stderr) console.log(stderr)
    console.log(stdout)
  })
})
