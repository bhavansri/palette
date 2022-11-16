import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'

import styles from '../styles/Home.module.css'
import Sidebar from './components/Sidebar'
import Page from './components/Page'
import { ItemTypes } from '../utils/types'
import Link from 'next/link'

const Container = () => {
  const [page, setPage] = useState({ backgroundColor: '#fff' })
  const [blocks, setBlocks] = useState([])
  const [selectedBlock, setSelectedBlock] = useState(null)

  useEffect(() => {
    console.log(blocks)
  })
  const generateBlocksParams = () => {
    const pageParam = page
    const blocksParam = { blocks: blocks }
    const params = Object.assign(blocksParam, pageParam)
    
    return JSON.stringify(params)
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

  const addHeadingHandler = () => {
    addTextHandler(ItemTypes.HEADING, '<h1>Write a heading</h1>')
  }

  const addSubheadingHandler = () => {
    addTextHandler(ItemTypes.HEADING, '<h2>Write a subtitle</h2>')
  }

  const addBodyHandler = () => {
    addTextHandler(
      ItemTypes.BODY, 
      `<p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mollis quam metus, eget vulputate metus congue sed. Proin blandit efficitur erat id dapibus. Morbi tristique, enim eget accumsan faucibus, lorem tortor mollis eros, eget congue justo eros a mi. Ut risus magna, cursus et velit eu, vehicula dapibus dui. Etiam a maximus massa, ac vestibulum tellus. Sed ut volutpat nisi, fringilla consequat nisi. Suspendisse non pulvinar diam. Suspendisse eu mauris erat.
      </p>`
    )
  }

  const addTextHandler = (type, value) => {
    let width = type === ItemTypes.BODY ? 450 : 'auto'
    
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
          onAddHeading={addHeadingHandler}
          onAddSubheading={addSubheadingHandler}
          onAddBody={addBodyHandler}
          onTextInputCreate={addTextInputHandler}
          onTextAreaCreate={addTextAreaInputHandler}
        />
        <div style={{ width: '-webkit-fill-available' }}>
          <div className="navbar flex justify-between mb-2">
            <a className="btn btn-ghost text-slate-100 normal-case text-2xl">Pageblox</a>
            <Link href={{ pathname: '/preview/[slug]', query: { slug: encodeURIComponent(generateBlocksParams()) } }}><a target="_blank"><button className="btn">Preview Page</button></a></Link>
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
