import React, { Fragment, useEffect, useState } from 'react'
import { BlobProvider, Font, Image, Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer'
import { Document as Bhavan, Page as BhavanPage, pdfjs } from 'react-pdf'
import parse, { domToReact } from 'html-react-parser'
import { useRouter } from 'next/router'
import { ItemTypes } from '../../utils/types'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
})

const options = {
    replace: domNode => {
        if (domNode.type === 'tag' && domNode.name === 'h1') {
            return <Text style={{ fontSize: '32px' }}>{domToReact(domNode.children, options)}</Text>
        } else if (domNode.type === 'tag' && domNode.name === 'h2') {
            return <Text style={{ fontSize: '24px' }}>{domToReact(domNode.children, options)}</Text>
        } else if (domNode.type === 'tag' && domNode.name === 'p') {
            return <Text style={{ fontSize: '13px' }}>{domToReact(domNode.children, options)}</Text>
        } else if (domNode.type === 'tag' && domNode.name === 'strong') {
            return <Text style={{ fontFamily: 'Times-Bold' }}>{domToReact(domNode.children, options)}</Text>
        } else if (domNode.type === 'tag' && domNode.name === 'u') {
            return <Text style={{ textDecoration: 'underline' }}>{domToReact(domNode.children, options)}</Text>
        } else if (domNode.type === 'tag' && domNode.name === 'em') {
            return <Text style={{ fontFamily: 'Times-Italic' }}>{domToReact(domNode.children, options)}</Text>
        }
    }
}

const renderGraphic = (block) => (
    <Image src={`/illustrations/${block.filename}`} alt={block.filename} style={{ width: block.width, height: block.height }} />
)

const renderImage = (block) => (
    <Image src={block.url} alt={block.url} style={{ width: block.width, height: block.height }} />
)

const Doc = ({ data }) => {
    const pageStyle = (({ backgroundColor }) => ({ backgroundColor }))(data)
    console.log(data.blocks)

    return (
        <Document>
            <Page size="A4" style={{ ...pageStyle }}>
                {data.blocks.map(block => {
                    return (
                        <View key={block.id} style={{ position: 'absolute', left: block.x, top: block.y, width: block.width, border: 'solid' }}>
                            {(block.type === ItemTypes.BODY || block.type === ItemTypes.HEADING) && parse(`${block.value.toString()}`, options)}
                            {block.type === ItemTypes.GRAPHIC && renderGraphic(block)}
                            {block.type === ItemTypes.IMAGE && renderImage(block)}
                        </View>
                    )
                }) }
            </Page>
        </Document>
    )
}

const PDFDocument = () => {
    const [isClient, setIsClient] = useState(false)
    const [pageData, setPageData] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if (router && router.query.slug) {
            setPageData(JSON.parse(decodeURIComponent(router.query.slug)))
        }

        setIsClient(true)
    }, [router])
    
    return (
        isClient && pageData && (
            <BlobProvider document={<Doc data={pageData} />}>
                        {({ blob, url, loading, error }) => {
                            if (blob) {
                                return (
                                    <div>
                                        <Bhavan file={blob}>
                                            <BhavanPage pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} />
                                        </Bhavan>
                                    </div>
                                )
                            } else {
                                return <></>
                            }
                        }}
            </BlobProvider>
    ))
}

export default PDFDocument