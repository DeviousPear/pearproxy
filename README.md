# pearproxy
## A goguardian proxy that does not work



Basically the way it works is a cookie is set on your computer that says what origin you are trying to get to. When you send an HTTP request, it (trys to) proxy you request to the equivalent path on the origin that is set by the cookie. It currently does not work right now but is in development.

You can set the cookie by going to `https://{pearproxy url}/to:{the url u wanna get to}`.
Currently, I have pearproxy hosted on:

- (https://pearproxy.vercel.app)
- (https://webpear.vercel.app)
- (https://ruby-prawn-ring.cyclic.cloud)
- (https://pearproxy.cyclic.cloud)

Feel free to host your own version by connecting this repo to the hostng service of your choice.


Made by DeviousPear
