import Pyana

xmlsource = "test.xml"
xsltsource = "base.xsl"

# From URIs
print Pyana.transform2String(  source=Pyana.URI(xmlsource),
                                style=Pyana.URI(xsltsource))
