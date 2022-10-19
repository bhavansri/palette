import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'

import styles from '../styles/Home.module.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Page from './components/Page'
import { ItemTypes } from './utils/types'

const Container = () => {
  const [page, setPage] = useState({ backgroundColor: '#fff' })
  const [blocks, setBlocks] = useState([])
  const [selectedBlock, setSelectedBlock] = useState(null)

  useEffect(() => {
    console.log(selectedBlock)
  })

  const onPageChange = (property, value) => {
    setPage(page => ({...page, [property]: value}))
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

  const addTextInputHandler = (label, textColor, bgColor) => {
    const inputFieldBlock = {
      type: ItemTypes.TEXT_INPUT,
      id: uuid(),
      x: 50,
      y: 100,
      height: 90,
      label: label,
      textColor: textColor,
      bgColor: bgColor
    }

    setBlocks(prevBlocks => [...prevBlocks, inputFieldBlock])
    setSelectedBlock(inputFieldBlock)
  }

  const addDropdownInputHandler = (label, options, textColor, bgColor) => {
    const dropdownFieldBlock = {
      type: ItemTypes.DROPDOWN_INPUT,
      id: uuid(),
      x: 100,
      y: 100,
      height: 90,
      width: 250,
      label: label,
      options: options,
      textColor: textColor,
      bgColor: bgColor
    }

    setBlocks(prevBlocks => [...prevBlocks, dropdownFieldBlock])
    setSelectedBlock(dropdownFieldBlock)
  }

  const createNewTextBlock = () => {
    const textBlock = {
      type: ItemTypes.TEXT,
      id: uuid(),
      x: 20,
      y: 80,
      height: 30,
      text: "Text Placeholder",
      font: 'Cinzel',
      color: '#000000',
      size: 'md',
      alignment: 'left'
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
        onImageSelect={addImageHandler}
        createNewTextBlock={createNewTextBlock}
        onTextInputCreate={addTextInputHandler}
        onDropdownInputCreate={addDropdownInputHandler}
        />
        <main className="p-7 h-screen flex-1 overflow-y-auto">
          <Navbar />
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
    <div className={styles.container} data-theme="dark">
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
