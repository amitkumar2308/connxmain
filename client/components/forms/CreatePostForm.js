import { Avatar, Button } from "antd";
import dynamic from "next/dynamic";
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePostForm = ({ content, setContent, postSubmit, handleImage, uploading, image }) => {
  return (
    <div className="card shadow">
      <div className="card-body pb-3">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Write something..."
          className="form-control border-0"
        />
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center text-muted">
        <Button onClick={postSubmit} type="primary" className="btn-sm" style={{ backgroundColor: 'black', borderColor: 'black', borderRadius:"5px"}}>
          Post
        </Button>
        <label className="m-0">
          {image && image.url ? (
            <Avatar size={30} src={image.url} />
          ) : uploading ? (
            <LoadingOutlined />
          ) : (
            <CameraOutlined />
          )}
          <input onChange={handleImage} type="file" accept="image/*" hidden />
        </label>
      </div>
    </div>
  );
};

export default CreatePostForm;
