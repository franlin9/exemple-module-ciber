import * as bcu from "bigint-crypto-utils"
export class MyRsaPublickey {
    e: bigint
    n: bigint

    constructor(e: bigint,n:bigint){
        this.e = e
        this.n = n
    }

    encrypt (m: bigint):bigint {
        const c = bcu.modPow(m,this.e,this.n)
        return c
    }

    verify (s: bigint):bigint {
        const m = bcu.modPow(s,this.e,this.n)
        return m
    }

}

export class MyRsaPrivate {
    d: bigint
    n: bigint

    constructor(d: bigint,n:bigint){
        this.d = d
        this.n = n
    }

    decrypt (c: bigint):bigint {
        const m = bcu.modPow(c,this.d,this.n)
        return m
    }

    sign (m: bigint):bigint {
        const s = bcu.modPow(m,this.d,this.n)
        return s
    }
}

interface KeyPair {
    publicKey: MyRsaPublickey
    privateKey: MyRsaPrivate
}

export async function generateMyRsaKeys (bitlength: number): Promise<KeyPair> {

    const e = 65537n
    let p:bigint, q: bigint, n: bigint, phi: bigint
    do {
        p = await bcu.prime(Math.floor(bitlength / 2))
        q = await bcu.prime(Math.floor(bitlength / 2) + 1)
        n = p * q
        phi = (p -1n) * (q - 1n)
    } while (bcu.bitLength(n) !== bitlength || !areCoprimes(phi,e))

    const d = bcu.modInv(e,phi)

    return {
        publicKey: new MyRsaPublickey (e,n),
        privateKey: new MyRsaPrivate (d,n)
    }
}

//con esto vemos si dos numero son comprimos 
// tenemos que ver n=p*q
const areCoprimes = (num1: bigint, num2: bigint) => {
    return bcu.gcd(num1, num2) === 1n
 };
 
