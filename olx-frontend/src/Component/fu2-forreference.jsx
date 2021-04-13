import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import "./dropzone.css";
import { Button, TextField } from "@material-ui/core";
import Navbar from "./Navbar";

import Thumb from "./Thumb";

class FUpload extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1 style={{ textAlign: "center" }}>Sell</h1>
        <div className="root">
          <Formik
            initialValues={{
              title: "",
              description: "",
              city: "",
              state: "",
              phone: "",
              attachments: [],
            }}
            onSubmit={async (values) => {
              let formData = new FormData();

              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("city", values.city);
              formData.append("state", values.state);
              formData.append("phone", values.phone);

              // for (let i = 0; i <= values.attachments.length; i++) {
              //   formData.append(`attachments[${i}]`, values.attachments[i]);
              // }

              for (const key of Object.keys(values.attachments)) {
                formData.append("attachments", values.attachments[key]);
              }

              // you would submit with fetch for example
              const res = await fetch(
                "http://localhost:5000/uploadmultiplefile",
                { method: "POST", body: formData }
              ).then((res) => {
                console.log(res);
              });

              // Do whatever on the sever
              alert("Form submitted!");
              console.log(formData.getAll("attachments"));
              console.log(formData.get("description"));
              console.log(formData.has("attachments[0]"));
              console.log(values);
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required("Title is required"),
              description: yup.string().required("Description is required"),
              city: yup.string().required("City is Required"),
              state: yup.string().required("State is required"),
              phone: yup
                .string()
                .matches(/^[6-9]\d{9}$/, "Enter valid number")
                .required("Phone number is required"),
            })}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit} className="form">
                <TextField
                  size="small"
                  fullWidth
                  margin="normal"
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />

                <TextField
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                  rowsMax={10}
                  margin="normal"
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <TextField
                  size="small"
                  fullWidth
                  margin="normal"
                  id="city"
                  name="city"
                  label="City"
                  variant="outlined"
                  value={values.city}
                  onChange={handleChange}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
                <TextField
                  size="small"
                  fullWidth
                  margin="normal"
                  id="state"
                  name="state"
                  label="State"
                  variant="outlined"
                  value={values.state}
                  onChange={handleChange}
                  error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                />
                <TextField
                  size="small"
                  fullWidth
                  margin="normal"
                  id="phone"
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  value={values.phone}
                  onChange={handleChange}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />

                {/* <div className="form-group"> */}
                <label>Add Images</label>

                {/* other Dropzone section */}

                <Dropzone
                  onDrop={(acceptedFiles) => {
                    // do nothing if no files
                    if (acceptedFiles.length === 0) {
                      return;
                    }

                    // on drop we add to the existing files
                    setFieldValue(
                      "attachments",
                      values.attachments.concat(acceptedFiles)
                    );
                  }}
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject,
                  }) => {
                    if (isDragActive) {
                      return "This file is authorized";
                    }

                    if (isDragReject) {
                      return "This file is not authorized";
                    }

                    if (values.attachments.length === 0) {
                      return (
                        <section className="dropzone">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          </div>
                        </section>
                      );
                    }
                    return values.attachments.map((file, i) => (
                      <Thumb key={i} file={file} />
                    ));
                  }}
                </Dropzone>
                {/* </div> */}
                {/* <button type="submit" className="btn btn-primary">
                  submit
                </button> */}
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default FUpload;
