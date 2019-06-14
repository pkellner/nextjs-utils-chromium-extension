# nextjs-utils-chromium-extension


A Google Extension that allows for easily viewing the size of the `windows.__NEXT_DATA__` static data that is downloaded with every server-side load from the open source <a href="https://nextjs.org/" target="_blank">NextJS framework</a> (server-side rendering create-react-app replacement built by <a href="https://zeit.co/" target="_blank">zeit.co</a>)

## Getting Started

Simply go to the chrom store and download the extension titled "NextJS Utils Extension"

### Compatability
Works with all versions of NextJS that I know of. Please create an issue if you find one that does not work.  Tested with V7 and V8.

### Inspiration

Building server-side rendered React apps requires that after all the HTML generated from the node server is generated, that HTML must be hydrated.  That is to say, all the events must be added back and the data (or state) associated with all elements must be reloaded. The most popular way to do this (which is how NextJS does it) is to create a static object declaration `window.__NEXT_DATA__` that gets downloaded in a script tag of the initial download.  Then, when the client side JavaScript does eventually run, that JavaScript uses that static data to hydate all the HTML.

If you want to learn more about this, I (Peter Kellner) have two courses on Pluralsight that talk about this. The first is titled <a href="https://www.pluralsight.com/courses/building-server-side-rendered-react-apps-beginners" target="_blank">Server Side Rending</a> and is a 2 hour primer on using the NextJS framework for bulding your apps.  The second course, though not specifically about server side rendering, uses NextJS and server side rendered code for all it's examples (<a href="https://www.pluralsight.com/courses/using-react-hooks" target="_blank">Using React Hooks</a>).



### Installing

coming...

## Authors

<a href="http://peterkellner.net" target="_blank">Peter Kellner, 73rd Street Associates</a>


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Chromium Team including Simeon Vincent




