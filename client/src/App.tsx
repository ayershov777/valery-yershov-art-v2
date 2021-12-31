import { useState } from "react";

function App() {
  const [image, setImage] = useState<Blob>();
  const [title, setTitle] = useState("");

  function onChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const image: File = Array.prototype.slice.call(e.target.files)[0];
    setImage(image);
  }

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData();
    
    if (image) {
      data.append("image", image);
    }
    
    if (title) {
      data.append("title", title);
    }

    fetch("http://localhost:3001/api/v1/collections/id/works", {
      method: 'POST',
      body: data,
    });
  }

  return (
    <div>
      {image && <img src={URL.createObjectURL(image)} />}
      <form onSubmit={onSubmit}>
        <input type="file" name="image" onChange={onChangeImage} />
        <input type="text" name="title" value={title} onChange={onChangeTitle} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
