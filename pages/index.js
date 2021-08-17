import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/index.module.css";
import {
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  ListItem,
  List,
} from "@chakra-ui/react";
import AddForm from "../components/AddForm";
import Link from "next/link";

export default function Home({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initialValues, setInitialValues] = useState({
    title: "添加快捷方式",
    item: null,
  });

  const [dataSource, setDataSource] = useState(data || []);

  const onSubmit = ({ id, title, link }) => {
    const exist = id ? dataSource.find((item) => item.id === id) : null;
    if (exist) {
      exist.title = title;
      exist.link = link;
      setDataSource(dataSource);
    } else {
      const target = [
        ...dataSource,
        {
          title,
          link,
          id: new Date().getTime().toString(),
        },
      ];
      setDataSource(target);
    }
    onClose();
  };

  const onOpenToggle = (title, item, onOpen) => {
    setInitialValues({
      title,
      item,
    });
    onOpen();
  };
  const isShowImg = (item, styles) => {
    if (item.imgUrl) return (<img
      className={styles.logoSite}
      src={item.imgUrl}
      alt=""
    />)
  }
  const handleKeyUp = (e) => {
    console.log(e.key)
    if (e.key === 'Enter' && e.target.value) {
      
      location.href="https://www.google.com/?pli=1"
    }
  }
  return (
    <div className="container">
      <Head>
        <title>Google App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>
          <div className={styles.logoWrapper}>
            <img src="/google_logo.svg" alt="" />
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.searchButton}></div>
            <input
              onKeyUp = {handleKeyUp}
              className={styles.mainInput}
              placeholder="在 Google 上搜索，或者输入一个网址"
            ></input>
            <div className={styles.voiceSearchButton}></div>
          </div>
          <div className={styles.listContainer}>
            {dataSource.map((item) => (
              <div className={styles.svgLinkTitle} key={item.id}>
                <Popover placement="bottom">
                  {({ onClose }) => (
                    <>
                      <PopoverTrigger>
                        <div className={styles.maskedImage}>
                          <div className={styles.moreCoder}></div>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverBody>
                          <List spacing={3} fontSize="13px">
                            <ListItem
                              onClick={() =>
                                onOpenToggle("修改快捷方式", item, onOpen)
                              }
                            >
                              修改快捷方式
                            </ListItem>
                            <ListItem
                              onClick={() => {
                                setDataSource(
                                  dataSource.filter(({ id }) => item.id !== id)
                                );
                                onClose();
                              }}
                            >
                              删除
                            </ListItem>
                          </List>
                        </PopoverBody>
                      </PopoverContent>
                    </>
                  )}
                </Popover>
                <Link href={item.link}>
                  <a title={item.title} target="_blank">
                    <div className={styles.titleIcon}>
                      {
                        isShowImg(item, styles)
                      }
                      
                    </div>
                  </a>
                </Link>
                <a title={item.title} href={item.link} target="_blank">
                  <div className={styles.titleLtrDesc}>
                    <span className={styles.titleDesc}>{item.title}</span>
                  </div>
                </a>
              </div>
            ))}
            {dataSource.length < 8 && (
              <div
                className={styles.svgLinkTitle}
                onClick={() => onOpenToggle("添加快捷方式", null, onOpen)}
              >
                <div className={styles.titleIcon}>
                  <img src="/add.svg" alt="" />
                </div>
                <div className={styles.titleLtrDesc}>
                  <span className={styles.titleDesc}>添加快捷方式</span>
                </div>
              </div>
            )}
          </div>
          <AddForm
            isOpen={isOpen}
            onClose={onClose}
            initialValues={initialValues}
            onSubmit={onSubmit}
          />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data: [
        {
          title: "百度一下，你就知道",
          link: "https://www.baidu.com/",
          imgUrl: '/images/baidu.png',
          id: Math.random(),
        },
        {
          title: "必应",
          link: "https://cn.bing.com/",
          imgUrl: '/images/biying.png',
          id: Math.random(),
        },
        {
          title: "Google",
          link: "https://www.jianshu.com/sign_in",
          imgUrl: '/images/jianshu.png',
          id: Math.random(),
        }
      ],
    },
  };
}
