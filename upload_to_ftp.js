const ftp = require("basic-ftp");
const path = require("path");

async function checkAndDeploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: "147.79.103.72",
      user: "u560645602.darkgray-weasel-586108.hostingersite.com",
      password: "Codex.072026",
      port: 21,
      secure: false
    });

    console.log("Current working directory list:");
    const list = await client.list();
    console.log(list);

    console.log("Uploading out/ directory to root of FTP...");
    const localDir = path.join(__dirname, "out");
    await client.uploadFromDir(localDir);

    console.log("UPLOAD FINISHED SUCCESSFULLY!");
  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}

checkAndDeploy();
