function removeCookie(cookie){
    const day = 24 * 60 * 60 * 1000;
    cookie.expires = Date.now() - day
    cookieStore
    .set(cookie)
    .then(
        () => {
        },
        (reason) => {
        console.error("It failed: ", reason);
        }
    );
}
let cookies = await cookieStore.getAll();
