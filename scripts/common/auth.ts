import { JwtToken } from '@gtm/lib.client.user';

export async function login(): Promise<boolean> {
    if (typeof(localStorage.getItem('jwt')) === 'string') {
        return Promise.resolve(false); // already loggedin, need logout first
    } else {
        localStorage.setItem('jwt', JSON.stringify(<JwtToken>{
            name: "John Doe",
            roles: { admin: true },
            scope: null,
            session: "session-id-123",
            user: "user-id-456",
            expires: 0,
            iat: 0,
            exp: 0,
            //"_jwt":".kb6mquetbd_r7pyOq2Qi_L83xfMdKW-WdnSsQniwMLA-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhhbmggUGhhbSIsInJvbGVzIjp7ImFkbWluIjp0cnVlfSwic2NvcGUiOm51bGwsInNlc3Npb24iOiI1Y2I5ZWIzY2ZjNzQ0OTAwMTczYWI1MWMiLCJ1c2VyIjoiNWE5NTg3M2FhMjhjNDA2ZmFlYzg2ZWQ2IiwiZXhwaXJlcyI6MTU1ODI4MDI1MjU0MywiaWF0IjoxNTU1Njg4MjUyLCJleHAiOjE1NTgyODAyNTJ9"
        }));
        return Promise.resolve(true);
    }
}

export async function logout(): Promise<boolean> {
    if (typeof(localStorage.getItem('jwt')) === 'string') {
        localStorage.removeItem('jwt');
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false); // not loggedin, need login first
    }
}

export async function token(): Promise<JwtToken> {
    const jwt = localStorage.getItem('jwt');
    if (typeof(jwt) !== 'string') {
        return Promise.resolve(undefined);
    }
    const jwtToken = <JwtToken>JSON.parse(jwt);
    return !!jwtToken && !!jwtToken.name ? jwtToken : undefined;
}