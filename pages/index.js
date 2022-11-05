import Head from 'next/head'
import React, { useState } from 'react'
import uuid from 'react-uuid'

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

  const addVideoHandler = (width, height) => {
    const videoBlock = {
      type: ItemTypes.VIDEO,
      id: uuid(),
      x: 20,
      y: 80,
      width,
      height
    }

    setBlocks(prevBlocks => [...prevBlocks, videoBlock])
    setSelectedBlock(videoBlock)
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

  const addTextHandler = (text) => {
    const textBlock = {
      type: ItemTypes.TEXT,
      id: uuid(),
      x: 20,
      y: 80,
      width: 200,
      height: 200,
      text: text,
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
    <div className="flex h-screen">
      <Sidebar
        page={page}
        selectedBlock={selectedBlock}
        setSelectedBlock={updateBlock}
        onPageChange={onPageChange}
        onButtonSelect={addButtonHandler}
        onImageSelect={addImageHandler}
        onGraphicsSelect={addGraphicsHandler}
        onVideoSelect={addVideoHandler}
        onTextCreate={addTextHandler}
        onTextInputCreate={addTextInputHandler}
        onTextAreaCreate={addTextAreaInputHandler}
        onCheckboxInputCreate={addCheckboxInputHandler}
        />
        <main className="p-7 h-screen flex-1 overflow-y-auto">
          <div className="min-h-full bg-stone-300 flex flex-col items-center justify-around py-5">
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
