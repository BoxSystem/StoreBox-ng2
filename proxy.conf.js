const PROXY_CONFIG = [{
    context: [
        "/api/v1",
        "/collections",
        "/files",
        "/goods"
    ],
    target: "http://server.pbr.link:4210",
    secure: false
}];

module.exports = PROXY_CONFIG;
