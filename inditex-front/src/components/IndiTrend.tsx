import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from "axios";
interface ImageData {
    url: string;
  }
export default function IndiTrend() {
    const [imagesResNet, setImagesResNet] = useState<ImageData[]>([]);
    const [imagesCustom, setImagesCustom] = useState<ImageData[]>([]);

    const [selectedImage, setSelectedImage] = useState<File | null> (null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];

        setSelectedImage(file)
    };
    const handleImageSubmit = async (e: any) => {
        const URL = 'http://127.0.0.1:8000/fashion'
        e.preventDefault()
        const formData = new FormData()
        if (selectedImage) {
            formData.append('image', selectedImage);
          }

        const response = await axios.post(URL, formData, {
            headers: {
            'Content-Type': 'multipart/form-data', // Required for file uploads
            },
        });
        const data = await response.data;
        const imageUrlsResNet = data['urls-resnet'] ;
        const imageUrlsCustom =  data['urls-custom'];
        setImagesResNet(imageUrlsResNet.map((url: string) => ({ url })));

        setImagesCustom(imageUrlsCustom.map((url: string) => ({ url })));

    
    };
    
    return (
        <>
            
            <Container>
                <Row>   
                    <Form className="w-100" onSubmit={handleImageSubmit}>
                        <h1 className="mt-5 mb-5">IndiTrend</h1>
                        <Row className="mt-2">
                            <Col xs={12}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Import a file with the prediction data</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Form.Group>
                                <Button
                                    className="w-100 btn btn-primary"
                                    variant="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                
                <Row >
                        {imagesResNet.length > 0 && (
                        <Col >
                        {imagesResNet.map((image) => (
                            
                            <img src={image.url} alt="Fetched Image" style={{width: '200px',height: '200px'}}/>
                            
                        ))}
                        </Col>
                    )}
                </Row>

                <Row >
                        {imagesCustom.length > 0 && (
                        <Col >
                        {imagesCustom.map((image) => (
                            
                            <img src={image.url} alt="Fetched Image" style={{width: '200px',height: '200px'}}/>
                            
                        ))}
                        </Col>
                    )}
                </Row>
            </Container>

        </>
    );
}


