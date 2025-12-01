import {
  getKeyValue,
  Snippet,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@heroui/react";

const aslamPvt = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQ2JV7KuU7dEOB
mo2oCDl3SiJapxNPDwzBiPwPsnALEpyIDgpGgQN66IJGC0iRc3IZmSwVvRG1G3p0
QtcY8LYdQDsw3G2pWYX6jzk17BAODyoYxsfDV/RU7EtwxvZXqSOp8VUMWl7oFQHk
nUxPLac7WDpzNarDHpgs1eeSwtSBKyXM4n7/bBqXaWFIh0PMwL8LKcZG+bWr7VG4
NucTn1LqRMVpMEgKpFUw19s+zFKwhLs5snqYB+5N+EkNHBRoFg9D34nto58HjjxN
9PcX4hIGhQFDw/uFXOcbORAcjafhyRoXeoyHzepQIdsorb8dlmbYRAlIC8R9vv5t
XPBQ+RARAgMBAAECggEAHQ38odGCaaaPm7DCQ129jOx54g27YHTSC/zAQHjNIKU6
tKzrXgqlzswZD6CTPHUIqyoFmZKfq4gCnbkMzrHyTBh7A52u/e/v9T9GsMtCIoqW
izLgaLtMSSJEjpCHhgOIbCSgdeL+sB/4DvOZQayyxs1L+Go/cvzHI/mwSVkkkkGL
e3VjkStzFWV8WGeECllbuvCOVAwD1VX3mT3n4z280iZ+6J8ev4fhi1r+FOUtcLc1
foOntEK1n+h+brJPbZ9sWEAAm5dO0KE9QobGKvR92cyTRe4+/5mVItjV/A9f6DSh
gITpyoa6vJOY4o0L66JyMgpgKBnyh/wZQef+SgTRRwKBgQD27TFEOhv600YzOwS5
jp3RBLtIn/m7rYwYzRvqMSayhnMD1s1jNuH/cNv4aygp9gSXJBe2SFfAwQlQlLCW
GfL5rfpWg/49o6vl7V3PQe/VI2vbNItxDsZ2Jdu8RM5v3rzefnvDt6LviqQxIOi9
ZF87rb4XM16/7ccNDjhcNnkvBwKBgQDYhSxAhmsHlNaa0MRwuUZZCRrhphd+wAKo
bHz2QQ/hWem7pOOJSgFlT/6KifxXnx7UyUVKqpCNKpn4JGPaSktnscRTXNhJyt9L
R3IdjYPQIiKYR7LvLtF/FWb2g8xN038xGzkJjGMn8K3nLgcPi/jFM6HrcOULIm7f
uX2NRCZqJwKBgQDdvjGA6IIZ5ELlXLmofOdCPfKFjIvyuy3VU9Qeolby+QQuTWaS
E0YuY0ZWtrwRuolyxQm6Owr64R8hSvWtRc5J46+so8nbxrBmwZt9tOPQTofcCTqz
o6YbkXHbhxqvoaGQWJuCLdXXMXSzXa9D7PAMosDTCuGqj7gyBDQesxhuXwKBgF0e
2Wte5EU8dBfdVb8NT/4W9mK55jzzI7GABzZ5wPSwkN/NCLcRBwylnNnEgqzEmKP3
dD+qn8S238VjETbe4RNV1xPrSHJkOCjOL3waUuh+5dYMcB6CSkOX1tKK2KFYJsnd
5Wf/4t1Ym9Jjb1H2ZyWZETiLM1bYlkrOIftRphvdAoGAKOl/eRPUokbRBrDMk7v7
ZP54JU2IRz1OvMeB/DLaPneVvxMfwjGeBZVJoIVED1qdYuA0MB7wkU2LB8WT2nno
FGaLqCLfIdvZz1dOUQpe68k1HEposyiH1QeHiMFkyHvg/vQzcvzpl1Z9zOoav10V
o3fNwnfKrDf81Hg+0jQDcEI=
-----END PRIVATE KEY-----`;
const aslamPub = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0NiVeyrlO3RDgZqNqAg5
d0oiWqcTTw8MwYj8D7JwCxKciA4KRoEDeuiCRgtIkXNyGZksFb0RtRt6dELXGPC2
HUA7MNxtqVmF+o85NewQDg8qGMbHw1f0VOxLcMb2V6kjqfFVDFpe6BUB5J1MTy2n
O1g6czWqwx6YLNXnksLUgSslzOJ+/2wal2lhSIdDzMC/CynGRvm1q+1RuDbnE59S
6kTFaTBICqRVMNfbPsxSsIS7ObJ6mAfuTfhJDRwUaBYPQ9+J7aOfB448TfT3F+IS
BoUBQ8P7hVznGzkQHI2n4ckaF3qMh83qUCHbKK2/HZZm2EQJSAvEfb7+bVzwUPkQ
EQIDAQAB
-----END PUBLIC KEY-----`;
const aslamJWK = `{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "xN7Bw0rgkX0Bomn1Y2xX9kAUbqWDCssvsgmoOfiCJ-57aNFvBC2zTWz5P2PkGcD5ntYnkdW5BJymbdJSYs77KXtjf-Gl-yEGtFxYJlVURzq-6UpKX1eZUJrRUVY9_knf5JpefQz6VHpGWJTFWmU8fL4fyzH-EGop-rTMfL6Fu3dMX23reMoe4gZurx20BGhfAGrhWzrdMu3IBhwCgiT49FSignXJilhkLG_QGW7Az71NZXH3VotcVSSv_PZcGlNyGgHd8prfMHB4xdLOiYNIfMzbAYaC2lK6X7dWPACoTr11Nvv47cvmoPv-LK4tkN61RZQZMbSyblTYwBLdn2J6SQ",
      "alg": "PS256",
      "kid": "SLDiOmDx1PV0mOTEM4VHZiQSJkFldzEyTb8cDvy9kt8"
    }
  ]
}`;
const aslamVot = `51601-6048897-3|imran-ahmed-khan-niazi|2025-11-03T12:33:30.954Z`;

const akramPvt = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2HF+HdhauCS3X
p6YGEP/BQ/btBKoqabiIYDdFFB4YL69BokxNgIxd3aYo9hABBdZBq/nEvckkJtHh
G5tBAwD5QYl94eTzf8ygYlNrGEMhQo/QaCd6fyTmZVODyue0a/MdRVvp3o2xxjJ/
VVn4I79d4zqZmo7InNOb3GGYqPTbbK5ccDl4mMCdbwzp0J3FbMsZBT9R1rmrMqJV
gSx2O22/uqcIWqK9/Yj/T61+rGbgcnIFmrhCd5Yvu5y7ingXiWZEIGieExJNHNmw
pVGAx7NugqwxSJU49gJr56e1PU1BcUXX505RlEx8SC065jlJoTD0b9qAAF79j/4Z
9V0Oi51VAgMBAAECggEAAhdBzejT998jwveKHf/n2VrWPELqRrO7OlNN3BHQCpCf
5g0wCYGusQqCVwHwYUrvEy4kRrJHqly6H2zixicFlI0xmJlOB3Y1fxmtmBWV8H5g
gw5exOWadmlqXuFm1Kt9KECqSFEOG3SfiJuc5OKUVsGjLcZCVTjj4XYEsYgkwxXt
HLdNUtZA34ygrDc66l5uB0SzYYnSaeavMZN5mUSaCPNXLvdizgFvS0jM4lB+9Gcb
s/XJIO8L71c1nMGdmJ2qsgYkhvX9fO4ohkZrAEd61gqJujQ04MFkqDeA0Lg2eOxu
guDdmhCFePl1ySSvvdw6FPNxilZwaCYqlQ6Bgye7mQKBgQD/tR95NNy53dyOoTSI
mFRLvpsuhBI6IvFpMieNSPshdroJh3cP9E7AKg/geRD+v2wQdXGHhaPUhrJb7AFx
FfSCoFM0fgoyXT9OQ8CgpkS8GNGNcjp+Qhoi7mA9SI/dFZUpm1jQro663KTysUQE
Vpmrn2nACFAp4sN4hVUce8zavQKBgQC2UbMMs91qKvV4GgTO0F8Ys4VviLsczCsa
O6AX+pMPN3Amh48B0sExLnX6EA63j3B7fRYCaXOaOCtqf/0o7H1hNbBl3GcETX7R
/78PlBkT2qvXHlc0KiWvlfh9kJ7fwGhK0gk1KOrckp7oLlTxXbALMIhXOEn/bHr/
lIfS+pnCeQKBgQCmwYST88BaSfBS55gt2EFo4BWtYR3N4gnTU4ztm4GCkj3ChyBD
PEy7DvMprWpC56zekuiFu8Zai7j3L1LFX88D/PAmFGgr7hmhvZd6bNP4YqsN9kdl
HVCUJSaH8LE5OaD78D4cYSndfJTpXGcB+UPf42cAf6tflW1qRHF70NSIdQKBgER5
bsvoidIkDEltTDz4mZ7HXehD7DKmo9GYb0pSPAVNBvwRka5Xn2N/VaPzf/OFFfPr
SObjAB391qCLLWO/Xl+yMGwxWSeOi4EHkpShRMHmMP/8TzgyVDEcHFXciS70Lrdb
J0Yl9f+dubzuGc0FKOcq9Sn85B3gelmfSVv97t3RAoGBAOGyqVEUEtgcQZuad+YY
UhZ3BOlTae3+kykniQMBUeX3Bv7stU8rwESFDKxdH7wxiKfYGeZBictLyCxJ/S+3
9cs1/il2aZaue2IrOtiLW18VHM2YebVUdfZMA5RX00L5F05QqwalRaiZ1kZOdJlg
rJAuQU9bFdiqvLNI0hQkjt3Z
-----END PRIVATE KEY-----`;
const akramPub = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAthxfh3YWrgkt16emBhD/
wUP27QSqKmm4iGA3RRQeGC+vQaJMTYCMXd2mKPYQAQXWQav5xL3JJCbR4RubQQMA
+UGJfeHk83/MoGJTaxhDIUKP0Ggnen8k5mVTg8rntGvzHUVb6d6NscYyf1VZ+CO/
XeM6mZqOyJzTm9xhmKj022yuXHA5eJjAnW8M6dCdxWzLGQU/Uda5qzKiVYEsdjtt
v7qnCFqivf2I/0+tfqxm4HJyBZq4QneWL7ucu4p4F4lmRCBonhMSTRzZsKVRgMez
boKsMUiVOPYCa+entT1NQXFF1+dOUZRMfEgtOuY5SaEw9G/agABe/Y/+GfVdDoud
VQIDAQAB
-----END PUBLIC KEY-----`;
const akramJWK = `{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "rXSJ85RQnR53-0rfLv2ryq1TUb0ElRIv_96ZzZNsNzJuEAIcp2Oq_Hstwr2ZloBa9CPfS_EuMr0K5TBawIDVME8ms0kDiKqHwLlAuc4OFtZgZcIk6C8VyLeWCq5_Qxny3OfV6ViVNyksZJpzwG_44TFkjq82U8qlXrtvC1lgMJ8bhF1p8UHUEXXB9GUAzHqd7_JSMwBUFZm7ElJK8XKRryNauQN4w_GQivXGtd0fK3mdQVWNn4pgRoeCMkNSl29vtdBOpymwND4tYET5rFuMoQjCvjGJjE4ZkToTnKLn_Ty71Btk_D8gRnvT5msZE7b5mKhTDn1DuYWjkU2DEqsF0w",
      "alg": "PS256",
      "kid": "FYm4NOohTOSBr8c3nKZoUWUsFQFX0uKlIezYYx861NA"
    }
  ]
}`;
const akramVot = `21402-9273059-5|mian-muhammad-nawaz-sharif|2025-11-03T12:33:57.633Z`;

const mohsinPvt = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3sz27k4LCUp7R
Z92ZxBFmDSPSL6pqXmC4ix3PEfrKmuowuQppvrV24YgHu3YpZAkN1pIYjrH7gjBi
t0OawYOLCqrSwj00j2sSBaMg1B6r3gCHv6A3VdrXdVZ1uCr8E/qc9r3qR3BHvX7f
l0iv9nOgxQgN+odM13HLse7VZJvctqElCptVUXVNjSAp/chVZ3zEWQlrNHCcjO9N
CnGSOGVWEcmU/VgqCBt7hoWc/oMtx2zncMUbokCJ36ipvuCF0q/plqP6EkkmPgde
CYOweLXzXERM7JPkCVStdeSD000Eh1de5+Lg8HtSN+nnWawnZCt5mcoovwL0gYG5
P/60HavDAgMBAAECggEAEyLV3HNqXKnUp4XFXN5C3bmisKOMghYgxzieu1JpKK/o
k3jDL+7Q4nht/jg1/+vO0aU3hN1ghw2x0qa6oSVleZd74gaf75i9E5yIuMPACjFP
JtT8cKc969HqVsr/l1DRe4ZslDoq5R5FWC9fQA1RUD8WLraZX5TV4t0/PvWDEwO6
B9aBcLFee0mM1JpQPpqSxZ6LEbpNvZU4MDKK9gEg/kXg4M1Fk/IBXhY5l4g/cwPY
DgPWd3gnVJROZFyEV+vgCguF0zskWJPIryiOOlCFR6MK1xDrMiQVep+QnLZ2g7p9
vPEco67yMJ0Cz97Cug/FuFdx2qrAdH+e1rtj+ZjAKQKBgQDqAsgtAQP1T+z16jIy
tKjMlZ4rX+DiXwnCPZA0DBoJcM8G2qOOoI5MITxzgf7C1o+TUWQ0RE9Tv1DAmt+w
HPQYdpCw3UyJzBdbsRRmAXrAO8TifQgbVAMn/waYwkJZ1zl0LZuE6WNBB9cRamrd
j6EInhMbY5mufmOAMYTsLtfrFwKBgQDI9jdu/zBlFHX5pVW7xEMxUaqa1l1wBWEP
rwrTy8ls+sofldwBEEwgHsuGxXjCNKvd3b/mxoBhWHcFbn7eDBdAuBLkMoXKnLSX
ZCoftp0UbBhu0eOPqMMt96Eo31ZBunwRViolnWvvH4xAqZJaBIaVtcv40yW84mi6
KHB2RCYANQKBgFo90mYQgy9BsDaxJsSJCKNEe2dspPOHBONkDE0V8aB8YUnaXMJu
xhEzq/U7Rzxps5pzA7poMVMxbvmnf+WRdMxORMP/wzlMfCF+60ffADBLnERfRRYM
0t7EqQ2VtDKjHePghp29xunYFScBK87fSZFiLCoewbAZy1MvRXwzIE7nAoGBAJgI
1iVOQKGoGhzVPYhBUghE3YootSXjm+vOpKVZHjkpfrLooDnZx43hXl7GlLZwPLos
YltIP6Xl1J2yW57HjOv0lq43nsqLRYDnUYsOj8X8hXuJpNxxc8AaAL24QTyWxfgj
tN0iPJ76whPFdihOFje7AuZrb7h3nX2AzJxcsFclAoGAdFIg5APDxjqPGcocTrL5
rRTol/iXieUvIVLMGFUbA4u3s0TNmzAysYvb10Huqf9AHBriVXqdss2IPe2Bw3yq
4ItKfvILiJd8njz8dZd8wk91WClUviRaGCYTGEQA3e5JlcvvhIXAbTC9WrN+o8nj
IawmWusaPXf1ZCZOPlvSvNc=
-----END PRIVATE KEY-----`;
const mohsinPub = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt7M9u5OCwlKe0WfdmcQR
Zg0j0i+qal5guIsdzxH6yprqMLkKab61duGIB7t2KWQJDdaSGI6x+4IwYrdDmsGD
iwqq0sI9NI9rEgWjINQeq94Ah7+gN1Xa13VWdbgq/BP6nPa96kdwR71+35dIr/Zz
oMUIDfqHTNdxy7Hu1WSb3LahJQqbVVF1TY0gKf3IVWd8xFkJazRwnIzvTQpxkjhl
VhHJlP1YKggbe4aFnP6DLcds53DFG6JAid+oqb7ghdKv6Zaj+hJJJj4HXgmDsHi1
81xETOyT5AlUrXXkg9NNBIdXXufi4PB7Ujfp51msJ2QreZnKKL8C9IGBuT/+tB2r
wwIDAQAB
-----END PUBLIC KEY-----`;
const mohsinJWK = `{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "0_ZmcV7HUwT7qsgKvrkmggJOWH_kYiHHKJwr5Y0L0vVkruzUXxAVIahpr30DcuN_BQ0OU3ryBY41tQECqe-Y_W66GaHIQYgc4wv02mNqgWY7txfElyIl0U0vFyG104ccSzOAHWfEM1w4eld-I1BRXAMj8jH-NykXo1vBceOI7-SkUPcP7Mod83jgaC8_4WB59VvGNPl02aTbg-jgvSekYGP2WDWy5Tr4LVzNfpxY1jX3h3DcCvVr-rJTNbryVQq-iQVDU8kjGbOMZM4iOuW44tjZAGPAzGsBIkqK5afjxrewkHR0tyTR3Us6JPHpycYWqjTO_cA6YkbLnU3v72aeRQ",
      "alg": "PS256",
      "kid": "x61E69F3GzkRYoUQwEvxoj11UF8zS2v56drsRqFqtnc"
    }
  ]
}`;
const mohsinVot = `41305-0753162-7|asif-ali-zardari|2025-11-03T12:34:11.977Z`;

const bilalPvt = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKredsf2GXesbK
ylsudu3c8sxbfhVlPyXEv5YitRXgYV+tGa3SrE2K/lcXvZ36v3EQ0B6QiW2smM6w
jER4q4wW37XqWSessZ9s2QCl67GZ8goqF7Abgz8nj4LWNh1wihVc2iYvmTJ4jF9h
nBS4iXpT/Cj8x1/BdsgEEZPRGBHwbaK0t234Y8+kOpa/bxM9ACviIa4U64PjueQu
hFFextfboSqnbu5k1UOA7a3a4Mw80DaJ7gNcGQmSC+1G7NxZeFqR0RBs6Gy8DIvL
y/Kl/lyGRhFeHFmzWJqPOtAXvPoUp3uiHiefZeyUEGcAH6Z9qIwUcGP2KcVzWJCC
fBLRy3ORAgMBAAECggEAMzteQki4rIe2dFBOWCJr4evlyELIub0KmP8svj0z+HHk
s2bIT3aKa1X7Qd8GbfmyZOOWtkZm2LgPlwT90drbIHUQENrUcoy7ldIMneREEnvi
Id23AF1eu2tFUUyAiI/+8meaO3HoFhy1h4Dio/rsVwpoee0TwV17Fbwztyj0b+dz
RzlBy8aMbrFMznPT5vYk7YUqXPoIoqQ3k4QVaZLe4lptw76KiNl+opiau21thdre
+dWHFTq+PAkzV4/eBodgHRyjANtUzD3u4NZAwxyZ3/q0IhPsAfpX02e20hAWy+CN
+0BuAGnaxpPnOtHYIum8odgQvQnJhVStwdgSxlCB+QKBgQD0QKDTvkR97rbs2lR/
3eWWG5PVg3qk87+HmhAqRY24Nz0rSVN1Mf9E6AoTwIUjEa13Y3CTqLQY65Tuhojk
NfdmjCT/042GYbE0OtqN+3ulX/q1GVywtw9jfMxBOq+1jh7Su5x/CsSInk6eADEy
FkMYVF9g0v02zAzlq8H7+7mYWwKBgQDUbWd4Ls4fxoxLWvDwW4SYv3GxGR11sJNA
7CwQYy2uWas8UBoUDOm4j7DNQMXHl30LC9c0wAHE0AMazZGn3jB2WRvKavWAFuBQ
8LSLTykKN79pyyk0f/Fpi+b3jD9qerzNMBbDjJDmGfAt1kiYPnJouRoHK0tc0I2L
Jr81zHgHgwKBgQC1jOg+G1n7pRkw2mQemwgQ2DS9aroZq9f8agaD9SkO+XgtGZbA
MMaGKFd9MQeE9pnSeQZvquEa+Ni9pyBPSNG41oiV42B5t1mo8eoLyRax6LKIM+7S
p273ywZjocSDFb1RdAQx5gYJamoTRR9MFIIQrn4qkQmH1onrmQxaSVQ9qwKBgBPt
f3tiyKtqcNbQ3TFvJG0/6GZ4uK7FtcqtXSTcaPimKM4rpYaj/3j04d0fam5i47QZ
lEK6kG/qI6BsEHHzAhDYIydGCWnOu5RcQFOhRXRT7nz6Ng9awUbpfO1UFs7iXLvS
+w+1LBKp9EIYjA7cLNduJebuRM+cMOsQ43cki04JAoGAbsHOP1vyC2gg9eHDWWM0
CRZvZh+eoyjO3Mv4VztsRrs9dlabhWM/83yiWpntuNwBh97XMoBsQ0qNQAJG9Cok
loOyCKWtunbj6iv0iiyUY5qaUnTMrv+V1aa7Qnh6I1yZGtU+my1BKC70LJisHhtA
slv8Kx4ixZFH6dr7KCLe6Ks=
-----END PRIVATE KEY-----`;
const bilalPub = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyq3nbH9hl3rGyspbLnbt
3PLMW34VZT8lxL+WIrUV4GFfrRmt0qxNiv5XF72d+r9xENAekIltrJjOsIxEeKuM
Ft+16lknrLGfbNkApeuxmfIKKhewG4M/J4+C1jYdcIoVXNomL5kyeIxfYZwUuIl6
U/wo/MdfwXbIBBGT0RgR8G2itLdt+GPPpDqWv28TPQAr4iGuFOuD47nkLoRRXsbX
26Eqp27uZNVDgO2t2uDMPNA2ie4DXBkJkgvtRuzcWXhakdEQbOhsvAyLy8vypf5c
hkYRXhxZs1iajzrQF7z6FKd7oh4nn2XslBBnAB+mfaiMFHBj9inFc1iQgnwS0ctz
kQIDAQAB
-----END PUBLIC KEY-----`;
const bilalJWK = `{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "7nYhi2p17Txyy2WDceGzdKKxma2hzKSjEllXhr87tR9hyqwY8ZBzQyaXc7sIRcXP_5hyLWACbvSQApiPts9REBCVrtMQZu6b6nmYBw6B95-oangbAj3l-0rLUdwrf40m4LpM8DDobK_mbU1gun4g_9ZdA55n1HCj5N3sLUalG5DmMhW7qeDNz8SEy0Vcqq7jDHK0uzgmqp9lMylZh3CqR0fYmJEKb9CXTcbHdgHtWsumlIMCLmvCKACeKG8Apu_g_ANthBxZcCVi2asHUIfUk2VOeFExcBFQgMGB0-M-DprP10Fc0al9R9JTEMCpIAPgFso3ank2lGViFfWV_R3dZw",
      "alg": "PS256",
      "kid": "ZmqXBScLBLGAJItVRz5HMJMriwdSmjGrDAJTDB9DnFk"
    }
  ]
}`;
const bilalVot = `37405-1930479-7|imran-ahmed-khan-niazi|2025-11-03T12:34:47.232Z`;

const saleemPvt = `-----BEGIN PRIVATE KEY-----
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
w5hsw3/WUnM8D6y/xYPifScVHNOxbg==
-----END PRIVATE KEY-----`;
const saleemJWK = `{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "7s_v2J_2xiFjUBry5qiH3czjrqbTVmK1Q9it_xLOIvtvM9FMiNRNu41dMfxL3W84IIefCWEgKrXtU9lgPFTe3aHkrOioz0xwfjyrBX2zmuRwuUBtmj6xjO6c2WLnbVvZML8-fISWdmJ7bmI2CxtQ8kvYx1ZJXRjoOlojnAGgzPCvkKpu8GXgkmzkZB-FZKH_e4RjGe4LNWT7ZKgx10YDK0AHQ5DEsRRn4l3k8gVS2MuBJe4Ib4zw-Ptq50mfOQQUQu3FWCJS6J_EnqlYCbMft9jQjV29QDXyKLQOrrnRhQGyV45RctcQVr-0EyUAtOGL5I38WQxT67SBNidC93tdLGBiU3sB2KBAKhrTKRaBssH6JqsEILJWtheh3WPLY7V0a62Nv29vRxIsCvPM7V7gqxer8UvR_eyz1H8rGf6WP14ddxiPQ_me-yMnuF3EHsEBPDAXxA7G-dYkdkrykuEQAF8BRj16saK8UbPZZFUezYwL0iajmH_lC-XM0IlzY9NyVrUpLbYqKtzIH3NuUYoy9rU1EdeuCzqVOiMtTw9_fc_V0Rlyci3Gk5EZVq02ddNg-ELPSrzDzGh0uKyAjY8y2_aKjY2rv-FtNh9Pgxv-oAGVrvrP6ivX4dMSxQNJm9Nqr5xMJJ_Vx8zgnBc8w-l4QfneBLqJC5R2nsM1CRQMW-k",
      "alg": "PS256",
      "kid": "nmhLIo67f9Pz4AOYyf8t9OPGQJ9Fgh5uvhPCVO4plgY"
    }
  ]
}`;

const rows = [
  {
    key: "1",
    id: "SLDiOmDx1PV0mOTEM4VHZiQSJkFldzEyTb8cDvy9kt8",
    vote: "imran-ahmed-khan-niazi",
    encrypted: "QPPGaw+M9noZnPFjaL6VpeP98uchl5fn9nLpgDbVaz+dtiDzJ0Y/m7Hq8tpGA1jIJWQukw9/m2ZEeLpzqNIkYEKLWSgWXygI4FK3++wqMieisKekRCUSji4E9neVzO2VN+iOnRlTMiDvCPU4GrRJdiQ5TnjQ5Icu2n7tjZYUhjwnUm1FTOCw4E7L/FlI3AT5xpicsqqNE1AV+55CTsfugRhfPEV4IQUFlTUzqvbKbNoSWxHRQeJMYLAYU9x0Jp01udwR58awEei9AFXap3EQpivyvSrMQ3m9awFaWR85lmf2P8M/F7u1SRlRu2Sh4UvUwisVQKexYBn7KvMMUrk1Pw==",
    officer: "nmhLIo67f9Pz4AOYyf8t9OPGQJ9Fgh5uvhPCVO4plgY",
    signature: "OfAfnVRVKluQR4zvaAgkVDM6uRmq3MtmaBNVE7v7oobtymrK67ua5rsl0zTOTFyS3yEOBYE8zrp4h7/YaX4laRdPhWKM7KkI4nTcDxhGewXWCHhXVe6geUvuAkKGW8G97mH5nuU6wa/b+RSLj/K2tpUAmF6PMjx8Bhj9vSxnwfntuEsdxayITYlgy2/rQPQo87O0F+YVUiSxKaLrVztdbq9lQxX8ZBAIXjPnHQTtu4s+cwg/zzWZJfi6g1D14aRF1/VsjMC0ztE6dP3qHzSS1sZX6pzaM0pWRSP8K1A38cThbQMKlm7bO4YKUT3rxeecuplj+O+qP/2ApGgbQ1cyPC1USKa792ijuO1S3nhj5o9w5jPMNlCGgvkxlt+RZnBlNLWjP7D4XZSxSmBohFfY28K2ZQfHd0kC7MX6BrDoM/6c0c5cJE0nqZspc2rEZLCprHbzD3rvYBw6uPJZ94z5cGW3o8CXzqtQkec6hfrXqgrbsQ6O2/iIejNiK850FmC49UgtsBhJ3nk1XYjblbSlJCEEnSQ1mKseLsUrvPgzTVSVkdilFDL64OMKtCN8DGFmpjDWasxSukUyPKwaY+u3oBp8fAbdZQPD4eoWmCmO4ZocLYSrzTTUvzmaYF8/43m5FgYxnuIQmzjo96k0TmRBoVawHaYfKxetSSyPpXUEyAM=",
  },
  {
    key: "2",
    id: "FYm4NOohTOSBr8c3nKZoUWUsFQFX0uKlIezYYx861NA",
    vote: "mian-muhammad-nawaz-sharif",
    encrypted: "StxfmGmlQ6kUUuBevSjMFH0DuyWFHwhY4J7hKPlx04SbrKDmeGjF7//TGkn0jtvq8dZCIeHxxFQZtUvCjoX7mQavbAIpQ4pydRpDM2zEaKEGAzh884gSifAfD/9Q4eH+2tlsxP9LRq1k1slcnioa2LPctPqPDPOG/2J+25DD8pF3oaxIenetpct8xCiqYMsgFFLipRg/jnY3Ho77dc59LFqKELZeGnrvbiSJDpBV5LVfO3liLNRkA/CvJAhLLiZWRy4eQbeDDpbB+75D5bBOa13mZtd8zwd+G3cXMudT3ryoi4t2p5rj8inIM1hamwT2J6TpP7a3ne7hcFsq1UzFHQ==",
    officer: "nmhLIo67f9Pz4AOYyf8t9OPGQJ9Fgh5uvhPCVO4plgY",
    signature: "RVN/tMT7EFtPpb5TZSH/5/a0EDGsUit0tmT35Aqj6L7p9pULvb4JI0F55tjZr1UekfbTYWQP0W7uzr+pfrxhrWXD2ezJvzblgqDp3yXC+zjBenYNR+fjSr2qTeN71yXUc5cGqpKO3NIzwZhhj7BqQWLkrfwU6CKwQ/TtKJfV7N15YNOTaDs4YZgY/xilXEBpOh1F1UVinsi2YF1NVgaaGG7xrNPZnsOKkHKNjaBPN7Lg+IUMQT5mw/KawKMyPtxFVwk/Fb3yO61IBwg8pB4GbsEX1XLILHPq1oU9dfVsrmDCsglvoj6vXQ6/q1g4lDu3xWo4sZGVP9InoXRu44MoCZel3dlIxMvFnm02qaK5km8QWAIW3zuBY7ELBBdoXzYZJMCRSVVeEagqvYXSWw2cutcaFhHXYzjqnw6/4m7jeah9J2OwHocJ7y8iQcQvZ28Y2iwAOWAOkyEn6xISGrDw1r2XfyRI/bD2TdIb3GgWQfvnM9T8xsGvnP4KpgkLfBHcZsLLuAiRqJa/Lp+momHrT3N1udiXbLJRcZbDt2cohUxvLbM67qT1aP5DEZKawY2MtiG1gjVdPmmeMlZwIbFhBDGW5AEHu2yIE4f/CX3dcCDk6I5fjz6idKKq0+1MSZDiFaO2CdEvDxV670WtDQtmKP9Tzhmi2DcjPwQ0QzjoA5A=",
  },
  {
    key: "3",
    id: "x61E69F3GzkRYoUQwEvxoj11UF8zS2v56drsRqFqtnc",
    vote: "asif-ali-zardari",
    encrypted: "ZK/kahaHrg0l0/UlxOwstwcFynE6xe5Pt3nM5tOrXFg0hG2qzZzzdMGUWeVgp/TqZIlRHOg8CLXV56C20a7SobTKgWSv0D9TUFNWG5drUTbJI2Gitfg78kd+4/s0phcG3p6YfoyHRJA5O9kUfSHWnIPMvp9KnEibV99y+9sfID/cXQkXopGkhAOLDUDTIpI+oBXbDqzWKPV9IeNCjfAM1dYGJA+jrYgz7dvpuWImhLlssvnQhRovnInnmMKJWRGsO6ri6/kJ3Ln3onbMD++qq3do9xQM8xfZpLTAjn8jn9V4LagP95swQ+BF/sxObUk5x0FqwyPIDe8S3uqSzoK/TA==",
    officer: "nmhLIo67f9Pz4AOYyf8t9OPGQJ9Fgh5uvhPCVO4plgY",
    signature: "TCYgih/Sv4u9H3QuhsYO7MVQhRBudoW9WoGkgXtSjtsFCheMGo0n2nBcVT3H3j1B9YcJTtWj+ZFBz0/Yl0Q8kXwokITIkTGf4zXMfM+maKrbvOJoi0nDRf8zSlOfXs8Mgomqe5mtLFgq0cGEUGJEOI2g2/fjTeUi5Na4K1949QXAnPA/q0dgpC58PU/eH8I/4uWs7ySDfM86Z6/Ka2pu99O7arXsIe1kjMx+QI1/PIDJsgsme2cbDdwnQ6zUBW0Vybfg5zXPL6iWIMM3qPSy2Q0STPMBJX5zKeCSzf2ptT41/PHh6Gdin6PIYFGJ/WAuKp5sNwMcWeIzMq94b1XRDumAHNwvtf5zXJlTMoWRvQe9wT8JbXbtdHJ0vT6Jcs6trvwpx+6cRsv6AHYh2OuYTEYmTalqE/ZYeFYziwjEjX9J+RXjTgadNY68cx7xd9j/ttsPDxTHgn1Bv5LGj/Ij/0Gqt6zhyVsmcj4cLaHkUs67t41u6zYUB/ryJ/gcU4NqX1O+CvV66DIDMgvLyxhgDVzjY316LDsa3JmMWX77lOCehnZKwsPbr8rS6COmcwuq7mVsiZwd2hAdEy9zSKpEV8OA73GtrYKONqpAYnJE5esn+xNcMhhKp9zDhxB+T2Up5bvhhsN2iLhiAf+1LXas4n8fks5Nch83DoTdgIzwySM=",
  },
  {
    key: "4",
    id: "ZmqXBScLBLGAJItVRz5HMJMriwdSmjGrDAJTDB9DnFk",
    vote: "imran-ahmed-khan-niazi",
    encrypted: "Y4qHiUedAhbb3uKCVxC/ur5b5fCGUu+KaZeuSm4D8ZTQsa3nlmEWO+Xsyzfs2S6JqT5wJcLzDow7w2bmrGznFTe6zyQ7zHfOK9DBPYcEhMQwt5DD6WRQ/A874gYm4jaHjUEPkwIFvVq29RKxfYIV5kboCRHh9MKMLqMGyzoMENFWNZaX5QgwQcEtd2/cku2LRsaYgcQ6srhyYAgYORs6A3coWMv1wWJMysqMBBWsjN1uquyhm9zzs+ps7FLAjF+TotcLFD68TpeHFOFbBFHtw0UfrVv7XVlBv8NbYqe5c1eBZ6BLo1lDONJ09i0S/5dKfT9dcqJ+ZbXfdtLFd4VSvg==",
    officer: "nmhLIo67f9Pz4AOYyf8t9OPGQJ9Fgh5uvhPCVO4plgY",
    signature: "hCo8Dkw3fPkDk7zikQv49lo7tYgxSwBwgVPrCvNNwC2ez34V+RlJfWHREBLEj0AalotXgQykMQpbBQe4gSj411voWeHxtWekqzEDUtgUfdkLhjhOJPNey9FiOphJa9KiZQMsiSyYIR5uS5EXZNTjUJvkbRl1i4bc4JGv3Dnk4yRMhxTbaMkYV7nXnY1Lfnf6WtExOqcYFX0AYk8RIaQZ7leukAgAu69RC0jWWdtmYQB142TL/bZvYhT5Pr/SY4g+HMNVMl0wZMzXm6153XwRpgcAsUgtfW/xQ0iAWkZUAnThuXNfAxtP8APfmoZfTJkefrgrrymKwsfdzAfEJ439Nf9UOnOGhiG04msO9bYdkd9fN3FQkmEn8XuA3cw+GqhtFhQgPLo3fhBBTfDc5hohMpOh70zRFk62Pz90RFlbweGWvL3YzzsdHECMYjXtTePLX8dXfuC0qFWAVeD/SuaEkz9c5vUtp2McJ976TqEkCJErq77fOil4fDklgPK0v528tWF3z1D6OdPVcEjNMv9OQT/+LcoyJpqS3SKChE6tm/TJ5zt/Aogg/NP3ajwo8rdbzlpxHZ4MgYg6ObAuLgz5KKKB0FVelN94u9baX43dfVaAoG0L7fcsn+7FoS7bbxiu7oMKkPoAEjOvbAdgvsBfX6bvsBSFYZpGbJODkk6iiLw=",
  },
];

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "vote",
    label: "VOTE",
  },
  {
    key: "encrypted",
    label: "ENCRYPTED",
  },
  {
    key: "officer",
    label: "OFFICER",
  },
  {
    key: "signature",
    label: "SIGNATURE",
  },
];

const genfun: Function = (item: any) => (columnKey: string) => {
  const kv = getKeyValue(item, columnKey)

  return <TableCell><Snippet hideSymbol codeString={kv}>{kv.substring(0, 10) + "..."}</Snippet></TableCell>}


export default function VerifyTable() {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold">Aslam</h3>
      <div className="grid grid-cols-4">
        <Textarea
          value={aslamPvt}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={aslamPub}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={aslamJWK}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={aslamVot}
          readOnly
          rows={10}
          className="font-mono"
        />
      </div>
      <h3 className="text-lg font-semibold">Akram</h3>
      <div className="grid grid-cols-4">
        <Textarea
          value={akramPvt}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={akramPub}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={akramJWK}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={akramVot}
          readOnly
          rows={10}
          className="font-mono"
        />
      </div>
      <h3 className="text-lg font-semibold">Mohsin</h3>
      <div className="grid grid-cols-4">
        <Textarea
          value={mohsinPvt}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={mohsinPub}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={mohsinJWK}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={mohsinVot}
          readOnly
          rows={10}
          className="font-mono"
        />
      </div>
      <h3 className="text-lg font-semibold">Bilal</h3>
      <div className="grid grid-cols-4">
        <Textarea
          value={bilalPvt}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={bilalPub}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={bilalJWK}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={bilalVot}
          readOnly
          rows={10}
          className="font-mono"
        />
      </div>
      <h3 className="text-lg font-semibold">Saleem (officer)</h3>
      <div className="grid grid-cols-2">
        <Textarea
          value={saleemPvt}
          readOnly
          rows={10}
          className="font-mono"
        />
        <Textarea
          value={saleemJWK}
          readOnly
          rows={10}
          className="font-mono"
        />
      </div>
      <h3 className="text-lg font-semibold mt-4">The following list will be public</h3>
      <Table aria-label="Example table with dynamic content"  removeWrapper
  classNames={{
    table: "table-fixed w-full",
  }}>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {genfun(item)}
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  );
}
