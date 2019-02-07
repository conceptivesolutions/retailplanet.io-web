const path = require('path');
const withSass = require('@zeit/next-sass');
const avoidPaths = ['node_modules', 'static'].map(d => path.join(__dirname, d).replace(/\\/g, "/"));

function canBeTransformed(pathToCheck)
{
  return !avoidPaths.some(function (v) {
    const p = pathToCheck.substr(0, pathToCheck.lastIndexOf('/') + 1);
    return p.includes(v);
  });
}

//noinspection JSUnusedGlobalSymbols
module.exports = withSass({
                            cssModules: true,
                            cssLoaderOptions: {
                              getLocalIdent: (loaderContext, localIdentName, localName) => {
                                const fileName = path.basename(loaderContext.resourcePath);
                                const shouldTransform = canBeTransformed(loaderContext.resourcePath.replace(/\\/g, "/"));

                                //console.log(shouldTransform + " - " + loaderContext.resourcePath);

                                if (!shouldTransform)
                                  return localName;

                                const name = fileName.replace(/\.[^/.]+$/, "");
                                const suffix = name.substring(name.lastIndexOf("_") + 1);
                                return `${name}___${localName}`;
                              }
                            },
                            publicRuntimeConfig: {
                              keycloak_realm: process.env.OAUTH_REALM,
                              keycloak_url: process.env.OAUTH_URL,
                              logout_redirect_url: process.env.LOGOUT_REDIRECT_URL
                            }
                          });