const ftp = require("basic-ftp");
const path = require("node:path");

const requiredConfig = [
  "HOSTINGER_FTP_HOST",
  "HOSTINGER_FTP_USER",
  "HOSTINGER_FTP_PASSWORD",
  "HOSTINGER_FTP_REMOTE_DIR",
];

const missingConfig = requiredConfig.filter((key) => !process.env[key]);
if (missingConfig.length > 0) {
  throw new Error(`Missing required deployment configuration: ${missingConfig.join(", ")}`);
}

async function deploy() {
  const client = new ftp.Client();

  try {
    await client.access({
      host: process.env.HOSTINGER_FTP_HOST,
      user: process.env.HOSTINGER_FTP_USER,
      password: process.env.HOSTINGER_FTP_PASSWORD,
      port: Number(process.env.HOSTINGER_FTP_PORT || 21),
      secure: true,
    });

    const localDir = path.join(__dirname, "out");
    await client.uploadFromDir(localDir, process.env.HOSTINGER_FTP_REMOTE_DIR);
    console.log("Static site upload completed over FTPS.");
  } finally {
    client.close();
  }
}

deploy().catch((error) => {
  console.error("Hostinger FTPS deployment failed:", error.message);
  process.exitCode = 1;
});
