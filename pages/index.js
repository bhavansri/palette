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

  const onPreviewClick = () => {
    for (const block of blocks) {
      if (block.type === ItemTypes.TEXT) {
        console.log(block.html)
      }
    }
  }

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

  const addTextHandler = (type) => {
    let value = ''
    let width = 'auto'
    
    switch (type) {
      case ItemTypes.HEADING:
        value = '<h1>Write a title</h1>'
        break
      case ItemTypes.SUB_HEADING:
        value = '<h2>Write a subtitle</h2>'
        break
      case ItemTypes.BODY:
        value = `<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mollis quam metus, eget vulputate metus congue sed. Proin blandit efficitur erat id dapibus. Morbi tristique, enim eget accumsan faucibus, lorem tortor mollis eros, eget congue justo eros a mi. Ut risus magna, cursus et velit eu, vehicula dapibus dui. Etiam a maximus massa, ac vestibulum tellus. Sed ut volutpat nisi, fringilla consequat nisi. Suspendisse non pulvinar diam. Suspendisse eu mauris erat.
        </p>`
        width = 450
        break
      default:
        value = ''
    }

    const textBlock = {
      type: type,
      id: uuid(),
      x: 20,
      y: 80,
      width: width,
      value: value
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
          onAddText={addTextHandler}
          onTextInputCreate={addTextInputHandler}
          onTextAreaCreate={addTextAreaInputHandler}
          onCheckboxInputCreate={addCheckboxInputHandler}
        />
        <div className='bg-stone-300' style={{ width: '-webkit-fill-available' }}>
          <div className="navbar flex justify-between mb-2">
            <a className="btn btn-ghost text-black normal-case text-2xl">Pageblox</a>
            <button className="btn" onClick={() => { onPreviewClick() }}>Preview Page</button>
          </div>
          <div className="text-editor flex flex-col items-center justify-around py-5">
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
