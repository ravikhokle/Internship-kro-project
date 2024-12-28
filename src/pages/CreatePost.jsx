import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    companyName: "",
    skills: "",
    stipend: "",
    location: "",
    duration: "",
    startDate: "",
    postDetails: "",
    userId: localStorage.getItem("userID"),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyPost = { ...post };
    copyPost[name] = value;
    setPost(copyPost);
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();

    const {
      title,
      companyName,
      skills,
      stipend,
      location,
      duration,
      startDate,
      postDetails,
    } = post;

    if (
      !title ||
      !companyName ||
      !skills ||
      !stipend ||
      !location ||
      !duration ||
      !startDate ||
      !postDetails
    ) {
      return handleError("All Fields are required");
    }

    try {
      const url = "https://internship-kro.onrender.com/posts/create";
      const response = await fetch(url, {
        method: "Post",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(post),
      });
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (

    <div className="px-5 md:px-10 lg:px-32 flex flex-col pb-10 bg-gray-100">
      <div className="mt-8">
        <h1 className="text-2xl md:text-4xl font-[600]">Post an internship</h1>
        <p className="py-3 text-sm md:text-base">
          Publish your internship to find the best intern for your
          project/company
        </p>
      </div>

      <div>
        <form onSubmit={handleCreatePost}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="title" className="py-3 font-bold">
                Internship Title
              </label>
              <input
                className="py-3 px-4 border-[#E7E7F1] bg-white border-2 outline-none"
                onChange={handleChange}
                type="text"
                id="title"
                name="title"
                autoFocus
                placeholder="Add internship title"
                value={post.title}
              />
            </div>

            <div className="flex flex-wrap gap-5">
              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="companyName" className="py-3 font-bold">
                  Company Name
                </label>
                <input
                  className="py-3 px-4 border-[#E7E7F1] border-2 outline-none"
                  onChange={handleChange}
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Enter your company name"
                  value={post.companyName}
                />
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="skills" className="py-3 font-bold">
                  Skills
                </label>
                <input
                  className="py-3 px-4 border-[#E7E7F1] border-2 outline-none"
                  onChange={handleChange}
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="Enter required skills"
                  value={post.skills}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="stipend" className="py-3 font-bold">
                  Stipend
                </label>
                <input
                  className="py-3 px-4 border-[#E7E7F1] border-2 outline-none"
                  onChange={handleChange}
                  type="number"
                  id="stipend"
                  name="stipend"
                  placeholder="00, 10000"
                  value={post.stipend}
                />
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="location" className="py-3 font-bold">
                  Location
                </label>
                <input
                  className="py-3 px-4 border-[#E7E7F1] border-2 outline-none"
                  onChange={handleChange}
                  type="text"
                  id="location"
                  name="location"
                  placeholder="New York, Remote"
                  value={post.location}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="duration" className="py-3 font-bold">
                  Duration
                </label>
                <input
                  className="py-3 px-4 border-[#E7E7F1] border-2 outline-none"
                  onChange={handleChange}
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="3 Months / 6 Months"
                  value={post.duration}
                />
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="startDate" className="py-3 font-bold">
                  Start Date
                </label>
                <input
                  className="py-3 px-4 border-[#E7E7F1] border-2 outline-none"
                  onChange={handleChange}
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={post.startDate}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="postDetails" className="py-3 font-bold">
                Internship Details
              </label>
              <textarea
                className="py-3 px-4 border-[#E7E7F1] border-2 outline-none"
                placeholder="Internship Details"
                value={post.postDetails}
                onChange={handleChange}
                id="postDetails"
                name="postDetails"
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-center md:justify-normal">
              <button
                type="submit"
                className="text-white text-lg font-bold rounded border-2 bg-purple-600 border-purple-600 w-full md:w-1/3 py-3"
              >
                Publish
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreatePost;
