import { React, useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", Password: "" });
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])


  const ref = useRef()
  const passwordRef = useRef()


  const showPassword = () => {
    passwordRef.current.type="text";
    if (ref.current.src.includes("/Eyeclosed.png")) {
      ref.current.src = "/Eyeopen.png"
      passwordRef.current.type = "text";
    }
    else {
      ref.current.src = "/Eyeclosed.png"
      passwordRef.current.type = "password";
    }
  }

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length >3 && form.Password.length > 3){
      console.log(form);
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]),
      );
      toast("Password saved!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }else{
      toast("Unable to save password!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    
  }

  const deletePassword = (id) => {
    console.log("password is deleted with id", id);
    let C = confirm("Do you really want to delete this password");
    if(C){
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
      toast("Password is deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    
  };

  const editPassword = (id) => {
    console.log("password is deleted with id", id);
    setform(passwordArray.filter(i=>i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text)=>{
    toast("Copied to clipboard", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text)
  }



  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="fixed inset-0 -z-10 min-h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="md:container px-2 md:px-40 py-16 md:mx-auto">
        <h1 className="font-bold text-4xl text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">Pro/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-5 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="bg-white rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="bg-white rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative flex items-center">
              <input
                ref={passwordRef}
                value={form.Password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="bg-white rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="Password"
              />
              <span
                className="absolute right-0 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="w-7 h-5"
                  src="/Eyeclosed.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex bg-green-500 hover:text-green-900 justify-center items-center rounded-full px-4 py-2 w-fit font-bold hover:border border-green-700"
          >
            <video
              src="/savekey.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-10 h-10"
            />
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-2xl font-bold py-5">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table class="table-auto w-full overflow-hidden rounded-lg mb-5">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border md:px-2 border-white">
                        <div className="text-center flex justify-between items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            onClick={() => {
                              copyText(item.site);
                            }}
                            className="cursor-pointer"
                            src="/Copy.svg"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="text-center md:px-2 border border-white">
                        <div className="text-center flex justify-between items-center">
                          {item.username}
                          <img
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="cursor-pointer"
                            src="/Copy.svg"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="text-center md:px-2 border border-white">
                        <div className="text-center flex justify-between items-center">
                          {item.Password}
                          <img
                            onClick={() => {
                              copyText(item.Password);
                            }}
                            className="cursor-pointer"
                            src="/Copy.svg"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="text-center md:px-2 border border-white">
                        <div className="text-center flex gap-5 justify-center items-center">
                          <div
                            className="group"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <img
                              className="cursor-pointer w-6 h-6 group-hover:hidden"
                              src="/delete.png"
                              alt="Copy"
                            />
                            <img
                              className="cursor-pointer w-6 h-6 hidden group-hover:block"
                              src="/Delete.gif"
                              alt="Copy"
                            />
                          </div>
                          <div
                            className="group"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <img
                              className="cursor-pointer w-6 h-6 group-hover:hidden"
                              src="/pen.png"
                              alt="Copy"
                            />
                            <img
                              className="cursor-pointer w-6 h-6 hidden group-hover:block"
                              src="/Pen.gif"
                              alt="Copy"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager