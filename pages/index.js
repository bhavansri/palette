import Head from 'next/head'
import React, { useState } from 'react'
import uuid from 'react-uuid'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

import styles from '../styles/Home.module.css'
import Sidebar from './components/Sidebar'
import Page from './components/Page'
import { ItemTypes } from '../utils/types'

const Container = () => {
  const [page, setPage] = useState({ backgroundColor: '#fff' })
  const [blocks, setBlocks] = useState([])
  const [selectedBlock, setSelectedBlock] = useState(null)

  const onPageChange = (property, value) => {
    setPage(page => ({...page, [property]: value}))
  }

  const onPreviewClick = async () => {
    const pdf = new jsPDF()
    
    for (const block of blocks) {
      switch (block.type) {
        case ItemTypes.TEXT:
          const textCanvas = await html2canvas(block.html)
          const imageData = textCanvas.toDataURL('image/png')

          const imgProperties = pdf.getImageProperties(imageData)
          const pdfWidth = pdf.internal.pageSize.getWidth()
          const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

          pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        default:
          console.log("Hello world!")
      }
    }

    pdf.save('print.pdf')
  }

  const addGraphicsHandler = (filename) => {
    const graphicsBlock = {
      type: ItemTypes.GRAPHIC,
      id: uuid(),
      x: 50,
      y: 50,
      width: 120,
      height: 120,
      filename
    }

    setBlocks(prevBlocks => [...prevBlocks, graphicsBlock])
    setSelectedBlock(graphicsBlock)
  }

  const addButtonHandler = (buttonType, buttonTitle) => {
    const buttonBlock = {
      type: ItemTypes.BUTTON,
      id: uuid(),
      x: 80,
      y: 80,
      width: 180,
      height: 50,
      buttonType,
      buttonTitle
    }

    setBlocks(prevBlocks => [...prevBlocks, buttonBlock])
    setSelectedBlock(buttonBlock)
  }

  const addImageHandler = (url) => {
    const imageBlock = {
      type: ItemTypes.IMAGE,
      id: uuid(),
      x: 20,
      y: 80,
      width: 170,
      height: 200,
      url: url
    }
    
    setBlocks(prevBlocks => [...prevBlocks, imageBlock])
    setSelectedBlock(imageBlock)
  }

  const addTextInputHandler = (label, bgColor) => {
    const inputFieldBlock = {
      type: ItemTypes.TEXT_INPUT,
      id: uuid(),
      x: 50,
      y: 100,
      height: 90,
      label: label,
      bgColor: bgColor
    }

    setBlocks(prevBlocks => [...prevBlocks, inputFieldBlock])
    setSelectedBlock(inputFieldBlock)
  }

  const addTextAreaInputHandler = (label, bgColor, shouldDisplayLines) => {
    const textareaBlock = {
      type: ItemTypes.TEXT_AREA,
      id: uuid(),
      x: 50,
      y: 100,
      height: 140,
      label: label,
      bgColor: bgColor,
      displayLines: shouldDisplayLines
    }

    setBlocks(prevBlocks => [...prevBlocks, textareaBlock])
    setSelectedBlock(textareaBlock)
  }

  const addCheckboxInputHandler = (label, options) => {
    const checkboxFieldBlock = {
      type: ItemTypes.CHECKBOX_INPUT,
      id: uuid(),
      x: 100,
      y: 100,
      height: 180,
      width: 250,
      label: label,
      options: options
    }

    setBlocks(prevBlocks => [...prevBlocks, checkboxFieldBlock])
    setSelectedBlock(checkboxFieldBlock)
  }

  const addTextHandler = () => {
    const textBlock = {
      type: ItemTypes.TEXT,
      id: uuid(),
      x: 20,
      y: 80,
      width: 500,
      height: 'auto',
      text: 'This is a test value'
    }

    setBlocks(prevBlocks => [...prevBlocks, textBlock])
    setSelectedBlock(textBlock)
  }

  const updateBlock = (blockProps) => {
    setBlocks(prevBlocks => {
      const newBlocks = prevBlocks.map(prevBlock => {
        if (prevBlock.id === blockProps.id) {
          return Object.assign(prevBlock, blockProps)
        }

        return prevBlock
      })

      return newBlocks
    })
  }

  const deleteBlock = () => {
    setBlocks(prevBlocks => {
      const newBlocks = prevBlocks.filter(block => block.id !== selectedBlock.id)

      return newBlocks
    })

    setSelectedBlock(null)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Sidebar
          page={page}
          selectedBlock={selectedBlock}
          setSelectedBlock={updateBlock}
          onPageChange={onPageChange}
          onButtonSelect={addButtonHandler}
          onImageSelect={addImageHandler}
          onGraphicsSelect={addGraphicsHandler}
          onTextCreate={addTextHandler}
          onTextInputCreate={addTextInputHandler}
          onTextAreaCreate={addTextAreaInputHandler}
          onCheckboxInputCreate={addCheckboxInputHandler}
        />
        <div style={{ width: '-webkit-fill-available' }}>
          <div className="navbar bg-base-100 flex justify-between mb-2">
            <a className="btn btn-ghost normal-case text-2xl">Pageblox</a>
            <button className="btn" onClick={() => { onPreviewClick() }}>Preview Page</button>
          </div>
          <div className="bg-stone-300 flex flex-col items-center justify-around py-5">
            <Page
              backgroundColor={page.backgroundColor}
              blocks={blocks}
              setBlock={updateBlock}
              didSelectBlock={(selectedBlock) => {
                setSelectedBlock(selectedBlock)
              }}
              selectedBlock={selectedBlock}
              deleteBlock={deleteBlock}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

const MemoizedContainer = React.memo(Container)

export default function Home() {

  return (
    <div className={styles.container} data-theme="business">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MemoizedContainer />
      </main>
    </div>
  )
}
