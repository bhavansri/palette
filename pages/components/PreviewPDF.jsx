import React from 'react'
import { BlobProvider, Font, Image, Page, Text, Document, View, StyleSheet } from '@react-pdf/renderer'
import { Document as Bhavan, Page as BhavanPage, pdfjs } from 'react-pdf'
import parse, { domToReact } from 'html-react-parser'
import { ItemTypes } from '../../utils/types'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
})

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    }
})

const options = {
    replace: domNode => {
        if (domNode.type === 'tag' && domNode.name === 'h1') {
            return <Text style={{ fontSize: '32px' }}>{domToReact(domNode.children, options)}</Text>
        } else if (domNode.type === 'tag' && domNode.name === 'h2') {
            return <Text style={{ fontSize: '24px' }}>{domToReact(domNode.children, options)}</Text>
        } else if (domNode.type === 'tag' && domNode.name === 'p') {
            return <Text style={{ fontSize: '13px', paddingHorizontal: '15px', paddingVertical: '12px' }}>{domToReact(domNode.children, options)}</Text>
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

// const renderImage = (block) => (
//     <Image src={block.url} alt={block.url} style={{ width: block.width, height: block.height }} />
// )

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
                            {/* {block.type === ItemTypes.IMAGE && renderImage(block)} */}
                        </View>
                    )
                })}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}

const PreviewPDF = ({ pageData }) => {

    return (
        pageData && (
            <div className="bg-gray-400 flex flex-col items-center justify-around py-5">
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
            </div>
    ))
}

export default PreviewPDF