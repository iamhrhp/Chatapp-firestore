import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import photo from '../images/photo.png';
import add from '../images/add.png';
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';
import kakashi from '../images/kakashi.jpg';
import phone from '../images/phone.png';
import camera from '../images/camera.png';
import list from '../images/list.png';
import addimg from '../images/add-image.png';
import send from '../images/send.png';
import plus from '../images/plus.png';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../firebase/FirebaseConfig';

const ChatPage = () => {
  const [data, setData] = useState<any>([]);
  const [chatdata, setChatData] = useState<any>([]);
  const [uimage, setUiimage] = useState<any>('');
  const [recieverid, SetRecieverId] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [displayImage, setDisplayImage] = useState<any>(null);
  // const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState<string>('');
  const senderId: any = localStorage.getItem('uid');
  const uname = localStorage.getItem('uname');

  // set recieverid--------------------
  const handleRecId = (id: any) => {
    const tempId = id;
    SetRecieverId(tempId);
  };
  console.log('recieverid---------------------', recieverid);

  // sending msgs-------------------------------
  const addMsg = async () => {
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        sendMsg: text,
        name: uname,
        id: [senderId, recieverid].sort().join('.'),
        time: serverTimestamp(),
      });
      addImage();
      console.log('text-------------', text);
      console.log('ID----------: ', senderId);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setText('');
  };

  // getting the Chat Data from firestore----------------------------
  const fetchChat = async () => {
    const dataQuery = query(
      collection(db, 'chats')
      // where('id', '=='[(senderId, recieverid)].sort().join('.'))
    );
    onSnapshot(dataQuery, (snapshot: any) => {
      const chatMsg = snapshot.docs.map((item: any) => ({
        ...item.data(),
      }));
      console.log('chat msgsssss-------------', chatMsg);
      setChatData(chatMsg);
    });
    console.log('chatmsg state-------------', chatdata);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  // getting the Users name from firestore----------------------------
  const fetchData: any = async () => {
    const myRef = collection(db, 'users');
    onSnapshot(myRef, (snapshot: any) => {
      const tempUsers = snapshot.docs.map((item: any) => ({ ...item.data() }));
      setData(tempUsers);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedFile(event.target!.files![0]);
  //   setFileName(event.target!.files![0].name);
  //   console.log('fileName------', fileName);
  //   console.log('selectedFile------', selectedFile);
  // };

  const handleFileName = (e: any) => {
    setFileName(e.target.files[0].name);
    setUiimage(e.target.files[0]);
  };

  console.log('Image Name----------------', '/images' + fileName);
  console.log('Image----------------', uimage);

  const addImage = async () => {
    try {
      const storageRef = ref(storage, 'images/' + fileName);
      const uploadTemp = uploadBytesResumable(storageRef, uimage);
      uploadTemp.on('state_changed', (snapshot: any) => {
        console.log(snapshot.state);
        if (snapshot.state === 'running') {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }
      });
    } catch (e) {
      console.log('error', e);
    }
    // getImages();
    // get image----------------------------
  };

  // display image-------------------------------------------------------------

  // const getImages = async () => {
  //   const snapshots = await uploadBytes(
  //     ref(storage, `images/${image.name}`),
  //     image
  //   );
  //   const downloadURL = await getDownloadURL(snapshots.ref);
  //   console.log('downloadURL-----------', downloadURL);
  //   setDisplayImage(downloadURL);
  // };

  useEffect(() => {
    const getImages = () => {
      getDownloadURL(ref(storage, fileName)).then((url) => {
        setDisplayImage(url);
      });
      console.log('Image Url----------------', displayImage);
    };
  }, []);

  return (
    <Box>
      <Box>
        <Grid container>
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: '10px',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
                    Chats
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: '10px' }}>
                    <img src={camera} style={{ width: '25px' }} />
                  </Box>
                  <Box sx={{ width: '100%', mt: '5px' }}>
                    <img src={addimg} style={{ width: '25px' }} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: '10px' }}>
                <Box>
                  <Box>
                    {data.map((item: any, index: any) => {
                      return (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'black',
                            color: 'white',
                            p: '10px',
                            m: '2px',
                            borderRadius: '5px',
                          }}
                          onClick={() => handleRecId(item.id)}
                          key={index}
                        >
                          <Typography sx={{ cursor: 'pointer' }}>
                            {item.name}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={9} md={9} sm={9} xs={9}>
            {recieverid ? (
              <Box sx={{ m: '10px' }}>
                {/* headers----------------------- */}

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <img
                      src={kakashi}
                      style={{ width: '30px', borderRadius: '80px' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: '100%', mr: '10px' }}>
                      <img src={phone} style={{ width: '30px' }} />
                    </Box>
                    <Box sx={{ width: '100%', marginRight: '10px' }}>
                      <img src={camera} style={{ width: '30px' }} />
                    </Box>
                    <Box sx={{ width: '100%', marginRight: '10px' }}>
                      <img src={list} style={{ width: '30px' }} />
                    </Box>
                  </Box>
                </Box>
                {/* chatpages----------------------- */}
                <Box sx={{ height: '600px', mt: '10px' }}>
                  {/* bottom----------------------- */}
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column-reverse' }}
                  >
                    {chatdata
                      ? chatdata.map((item: any, index: any) => {
                          console.log('map Data-------------------', item);
                          return (
                            <Box
                              key={index}
                              sx={{
                                width: '100%',
                                display: 'flex',
                              }}
                            >
                              <Typography
                                sx={{
                                  display: 'flex',
                                  p: '10px',
                                  bgcolor: 'black',
                                  color: 'white',
                                  m: '10px',
                                  borderRadius: '10px',
                                  textAlign: 'left',
                                  width: 'auto',
                                }}
                              >
                                {item.sendMsg}
                              </Typography>
                              {/* <Typography>{item.time * 1000}</Typography> */}
                              <Box sx={{ width: '100px' }}>
                                <img
                                  src={displayImage}
                                  style={{ width: '30px' }}
                                />
                              </Box>
                            </Box>
                          );
                        })
                      : null}
                  </Box>
                </Box>
                <Box sx={{ mt: '20px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* <Box sx={{ width: '100%', mr: '10px' }}>
                      <img src={addimg} style={{ width: '30px' }} />
                    </Box> */}
                      <Box onClick={addImage}>
                        <input
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept="image/png, image/jpeg"
                          onChange={handleFileName}
                        />
                      </Box>

                      <Box sx={{ width: '100%', marginRight: '10px' }}>
                        <img src={plus} style={{ width: '30px' }} />
                      </Box>
                      <Box sx={{ width: '100%', marginRight: '10px' }}>
                        <img src={list} style={{ width: '30px' }} />
                      </Box>
                    </Box>
                    <TextField
                      value={text}
                      onChange={(e: any) => setText(e.target.value)}
                      label="Write Something..."
                      fullWidth={true}
                    ></TextField>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button onClick={addMsg}>
                        <Box sx={{ width: '100%', ml: '10px' }}>
                          <img src={send} style={{ width: '30px' }} />
                        </Box>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatPage;
