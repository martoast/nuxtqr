# nuxtqr

> My finest Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

You have 2 different types of users, Merchants and users.
Merchants have an account under an email address with UID.
Every merchant creates discounts for their profile.
Those discounts have an _ID,Price and Decription_.
Merchants QR code on display holding the merchants UID.

Normal User login in Gmail or facebook can scan merchants QR code.
Every merchant QR code that is scanned is _saved under user's dashboard_.
Upon every scan of that merchant's QR code, the _user gains a point under that merchants UID_.

In the dashboard a user and see all the stores they have scanned a qr code at.
Upon clicking on a store, the user can _see all the coupons_ and costs that the merchant has created.
IF the user has enough points to afford a discount,the user can _spend those points to buy the discount_.
A QR code is generated that holds a _randomly generated ID and the UID of the merchant who created it_.
The user saves this QR code and presents it at the counter on his next visit.

When the user presents a QR code at the register, _the employee scans it using their phone_.
If the ID from the QR code is the _same as one in the database_, then the coupon is VALID.
Once validated the coupon document is deleted from the database and _cant be used again_.
