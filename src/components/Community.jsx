import React from 'react'
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, BellIcon, Bars3Icon,FolderIcon,UserGroupIcon, ArrowLeftStartOnRectangleIcon  } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { MapPinIcon, MapIcon } from '@heroicons/react/24/solid';
import { useState, useEffect , useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import scene from '../assets/Images/scene.jpeg'
import { PhotoIcon } from '@heroicons/react/24/outline';
import image1 from '../assets/Images/image1.jpeg'
import comm_logo from '../assets/Images/comm_logo.jpg'
import profile_picture from '../assets/Images/profile_picture.jpeg';
import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import '../App.css'
import Logo from '../assets/Images/logo.png'
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Dialog, } from "@/components/ui/dialog"
import { uploadImage } from '@/lib/hooks';
import { toast } from 'sonner';
import api from '@/lib/api';
import { getUser } from '@/lib/firebase';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { PlusCircle, ThumbsUp, ThumbsDown, Search } from "lucide-react"

function Community() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [communityData, setCommunityData] = useState(null);
    const { id } = useParams();
    const [image, setImage] = useState(null)
    const [text, setText] = useState("")
    const [posts, setPosts] = useState([]);
    const [currentUserId,setCurrentUserId ] = useState("")
    const [logOutBar, setLogoutBar] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    console.log(location.pathname)
    console.log(id)

    useEffect(() => {
      const currentuser = getUser()
      if(!currentuser) {
        toast.error("Unauthorised !")
        return null
      }
        setCurrentUserId()
        const fetchCommunityData = async () => {
            try {
                const response = await api.get(`/community/${id}`);
                if (response.data.success) {
                    setCommunityData(response.data.community);
                    console.log(response.data)
                } else {
                    toast.error("Error fetching community data");
                }
            } catch (error) {
                console.error('Error fetching community data:', error);
                toast.error("Error fetching community data");
            }
        };

        fetchCommunityData();
    }, [id]);

    const handleAddComment = async (postId) => {
        try {
            const response = await api.post(`/posts/${postId}/comment`, {
                userId: currentUserId,
                text: newComment
            });
            if (response.data.success) {
                const newCommentObj = {
                    id: response.data.comment.id,
                    text: newComment,
                    commentedBy: {
                        id: currentUserId,
                        name: getUser().name // Assuming getUser() returns user info including name
                    }
                };
                setPosts(prevPosts => prevPosts.map(post => 
                    post.id === postId 
                        ? { ...post, comments: [...(post.comments || []), newCommentObj] }
                        : post
                ));
                setNewComment("");
                toast.success("Comment added successfully");
            } else {
                toast.error("Error adding comment");
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error("Error adding comment");
        }
    };

    const toggleLike = async (postId) => {
        try {
          const post = posts.find(p => p.id === postId);
          const newIsLiked = !post.isLiked;
          setPosts(prevPosts => prevPosts.map(post => 
              post.id === postId ? { ...post, isLiked: newIsLiked } : post
          ));
            
            const response = await api.post(`/posts/${postId}/${newIsLiked ? "like" : "unlike"}`, {
                userId: currentUserId
            });
            
            if (response.data.success) {
            } else {
                toast.error("Error liking post");
            }
        } catch (error) {
            setPosts(prevPosts => prevPosts.map(post => 
                post.id === postId ? { ...post, isLiked: !post.isLiked } : post
            ));
            console.error('Error toggling like:', error);
            toast.error("Error liking post");
        }
    };
    
    const handleAddPost = async () => {
        try {
          const imageUrl = image ? await uploadImage(image) : null;
          const res = await api.post("/community/post/create" , {
                communityId : id,
                userId : getUser().id,
                text,
                image : imageUrl
            })
            if(res.data.success){
                setModalOpen(false)
                toast.success("Post added successfully")
            }
            else{
                toast.error("Error adding post")
            }
            console.log(res.data)
        } catch (error) {
            toast.error("Error adding post")
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get(`/posts/all`);
                if(response.data.success){
                    console.log(response.data.posts)
                    setPosts(response.data.posts.map(post => ({
                        ...post,
                        comments: post.comments || [], // Ensure comments array exists
                        isLiked: post.likes.map(like => like.userId).includes(currentUserId)
                    })));
                }
                else{
                    toast.error("Error fetching posts");
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                toast.error("Error fetching posts");
            }
        };

        fetchPosts();
    }, [currentUserId]);

    // QNA
  const [questions, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState({ question: "", keywords: "" })
  const [newAnswer, setNewAnswer] = useState({ questionId: 0, answer: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await api.get('/qna/');
      if (response.data.success) {
        setQuestions(response.data.questions);
        console.log(response.data.questions)
      } else {
        toast.error("Error fetching questions");
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error("Error fetching questions");
    }
  };

  const handleCreateQuestion = async () => {
    try {
      const response = await api.post('/qna/', {
        question: newQuestion.question,
        tags: newQuestion.keywords.split(',').map(keyword => keyword.trim()),
        communityId: id,
        userId: currentUserId
      });
      if (response.data.success) {
        setQuestions([response.data.question, ...questions]);
        setNewQuestion({ question: "", keywords: "" });
        toast.success("Question added successfully");
      } else {
        toast.error("Error adding question");
      }
    } catch (error) {
      console.error('Error creating question:', error);
      toast.error("Error adding question");
    }
  };

  const handleCreateAnswer = async (questionId) => {
    try {
      const response = await api.post(`/qna/${questionId}/answer`, {
        answer: newAnswer.answer,
        userId: currentUserId
      });
      if (response.data.success) {
        const updatedQuestions = questions.map((q) => {
          console.log(q)
          if (q.id === questionId) {
            return { 
              ...q, 
              answers: [...(q.answers || []), response.data.answer] 
            };
          }
          return q;
        });
        setQuestions(updatedQuestions);
        setNewAnswer({ questionId: 0, answer: "" });
        toast.success("Answer added successfully");
      } else {
        toast.error("Error adding answer");
      }
    } catch (error) {
      console.error('Error creating answer:', error);
      toast.error("Error adding answer");
    }
  };

  const handleHelpful = async (questionId, answerId, isHelpful) => {
    try {
        const response = await api.post(`/qna/answer/${answerId}/${isHelpful ? 'upvote' : 'downvote'}`, {
            userId: currentUserId
        });
        if (response.data.success) {
            const updatedQuestions = questions.map((q) => {
                if (q.id === questionId) {
                    const updatedAnswers = q.answers.map((a) => {
                        if (a.id === answerId) {
                            return {
                                ...a,
                                helpfulCount: isHelpful ? a.helpfulCount + 1 : a.helpfulCount,
                                notHelpfulCount: !isHelpful ? a.notHelpfulCount + 1 : a.notHelpfulCount
                            };
                        }
                        return a;
                    });
                    return { ...q, answers: updatedAnswers };
                }
                return q;
            });
            setQuestions(updatedQuestions);
            toast.success(isHelpful ? "Answer marked as helpful" : "Answer marked as not helpful");
        } else {
            toast.error("Error updating answer helpfulness");
        }
    } catch (error) {
        console.error('Error updating answer helpfulness:', error);
        toast.error("Error updating answer helpfulness");
    }
  };

  const handleNewQuestionChange = (event) => {
    const { name, value } = event.target
    setNewQuestion({ ...newQuestion, [name]: value })
  }

  const handleNewAnswerChange = (event, questionId) => {
    setNewAnswer({ answer: event.target.value, questionId })
  }

  const filteredAndSortedQuestions = useMemo(() => {
    return questions
      .filter((q) =>q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
        q.answers.some(a => a.answer.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === "newest") {
          return b.id - a.id
        } else if (sortBy === "mostHelpful") {
          const aHelpfulness = a.answers.reduce((sum, ans) => sum + ans.helpfulCount, 0)
          const bHelpfulness = b.answers.reduce((sum, ans) => sum + ans.helpfulCount, 0)
          return bHelpfulness - aHelpfulness
        } else if (sortBy === "leastHelpful") {
          const aHelpfulness = a.answers.reduce((sum, ans) => sum + ans.helpfulCount, 0)
          const bHelpfulness = b.answers.reduce((sum, ans) => sum + ans.helpfulCount, 0)
          return aHelpfulness - bHelpfulness
        }
        return 0
      })
  }, [questions, searchTerm, sortBy])
  console.log(communityData)
    

    return (
        <>
         <div className={`w-full h-screen bg-customColor relative overflow-x-hidden overflow-y-hidden ${isModalOpen ? 'blur-md' : ''}`}>

              <div className='fixed top-4 left-4 z-50 md:hidden'>
                    <button 
                        className='p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition duration-300'
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        <Bars3Icon className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Sidebar */}
              <div>
                
              </div>
              <div className={`fixed inset-y-0 left-0 w-60 h-screen bg-customColor shadow-2xl flex flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-60 z-40`}>
                <div className="flex justify-center items-center mt-1">
                      <img src={Logo} alt="Logo" className="w-60 h-auto" /> {/* Adjust width/height as necessary */}
                    </div>
                    <div className="w-20 h-48 bg-gradient-to-l from-yellow-300/65 via-yellow-900/40 to-customColor rounded-l-full absolute right-0 top-40 opacity-60"></div>
                    
                    {/* Logo Section */}

                    
                    <div className='relative mt-8 md:mt-0'> {/* Adjust margin-top for the content */}
                      <ul className="space-y-1">
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/home') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/home" className="flex items-center w-full h-full">
                            <HomeIcon className="w-6 h-6 mr-3" /> Home
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/communities', '/community') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/communities" className="flex items-center w-full h-full">
                            <UserGroupIcon className="w-6 h-6 mr-3" /> Communities
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/feed') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/feed" className="flex items-center w-full h-full">
                            <FolderIcon className="w-6 h-6 mr-3" /> Feed
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/travelbuddy') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/travelbuddy" className="flex items-center w-full h-full">
                            <MapIcon className="w-6 h-6 mr-3" /> Travel Buddy
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/guide') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/guide" className="flex items-center w-full h-full">
                            <UsersIcon className="w-6 h-6 mr-3" /> Travel Guide
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/hotels') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/hotels" className="flex items-center w-full h-full">
                            <BuildingOffice2Icon className="w-6 h-6 mr-3" /> Hotels
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/about') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/about" className="flex items-center w-full h-full">
                            <InformationCircleIcon className="w-6 h-6 mr-3" /> About
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`} onClick={() => setLogoutBar(true)}>
                          <Link to="" className="flex items-center w-full h-full">
                            <ArrowLeftStartOnRectangleIcon className="w-6 h-6 mr-3" /> Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
             {/* Main Div */}
             <div className='absolute w-full h-full left-1/2 transform -translate-x-1/2 flex flex-col overflow-y-scroll md:left-80 md:transform-none md:top-10'>

                <div
                    className='w-5/6 md:w-4/6 md:h-80 h-44 ml-10 flex mt-12 md:ml-0 md:mt-0 md:m-0 bg-black rounded-2xl'
                    style={{
                        backgroundImage: `url(${communityData?.image ?? scene})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        flexShrink: 0
                    }}
                ></div>

                {/* Modify this part to handle null communityData */}
                {communityData ? (
                  <div className='w-5/6 md:w-4/6 h-20 md:h-24 ml-10 md:ml-0 flex mt-2 self-start rounded-2xl items-center justify-between'>
                        <div className='flex items-center'>
                            {communityData.image ? (
                              <div className='w-14 h-14 md:w-24 md:h-24 rounded-full bg-white flex' style={{ backgroundImage: `url(${communityData.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            ) : (
                              <div className='w-14 h-14 md:w-24 md:h-24 rounded-full bg-white flex' style={{ backgroundImage: `url(${comm_logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            )}
                            <div className='ml-4 md:text-2xl text-xl font-semibold text-white'>{communityData.name}</div>
                        </div>
                        <div>
                            <button type='button' className='bg-customColor2 p-2 rounded-md hover:cursor-pointer hover:scale-105 duration-300 hover:bg-yellow-600' onClick={() => setModalOpen(true)}>Create</button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                    <div className='w-5/6 md:w-4/6 h-12 md:h-12 ml-10 md:ml-0 flex mt-4 items-center justify-center self-start rounded-2xl'>
                        <input
                            className='w-1/2 h-full rounded-2xl bg-customColor1 p-2'
                            placeholder='Share about your Trip'
                            onChange={(e) => setText(e.target.value)}
                        />
                        <label htmlFor='imageUpload' className='ml-4 cursor-pointer'>
                            <PhotoIcon className='w-8 h-8 text-white' />
                        </label>
                        <input
                            id='imageUpload'
                            type='file'
                            className='hidden'
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setImage(file)
                                console.log(file);
                            }}
                        />
                    </div>

                    <div>
                        <p className='text-xl font-semibold text-white mt-2 ml-4'> Featured</p>
                    </div>
                    <div className='w-96 md:w-4/6 h-96 flex overflow-x-auto hide-scrollbar flex-nowrap mt-2 flex-shrink-0' style={{ scrollBehavior: 'smooth', overflowX: 'auto' }}>
                        {posts.filter(post => post.image).map((post) => (
                            <div key={post.id} className='w-64 h-64 bg-customColor1 rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                                <div>
                                    <img src={post.image} className='h-40 w-full rounded-t-xl' alt={post.text} />
                                </div>
                                <div>
                                    <p className='font-semibold text-lg mt-2 text-white'>{post.text}</p>
                                </div>
                                <div className='flex'>
                                    <div className='w-8 h-8 mt-5 ml-1 rounded-full' style={{ backgroundImage: `url(${post.postBy.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <div className='mt-6 ml-2 text-white'>{post.postBy.name}</div>
                                </div>
                            </div>
                        ))}
                        {/* First hardcoded post */}
                        <div className='w-64 h-64 bg-customColor1 rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                            <div>
                                <img src={image1} className='h-40 w-full rounded-t-xl' alt="Mabaleshwar Hills" />
                            </div>
                            <div>
                                <p className='font-semibold text-lg mt-2 text-white'>In the hills of Mabaleshwar</p>
                            </div>
                            <div className='flex'>
                                <div className='w-8 h-8 mt-5 ml-1 rounded-full' style={{ backgroundImage: `url(${profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                <div className='mt-6 ml-2 text-white'>Alexa Zeondor</div>
                            </div>
                        </div>

                        {/* Second hardcoded post */}
                        <div className='w-64 h-64 bg-customColor1 rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                            <div>
                                <img src={scene} className='h-40 w-full rounded-t-xl' alt="Beach Scene" />
                            </div>
                            <div>
                                <p className='font-semibold text-lg mt-2 text-white'>Sunset at the beach</p>
                            </div>
                            <div className='flex'>
                                <div className='w-8 h-8 mt-5 ml-1 rounded-full' style={{ backgroundImage: `url(${comm_logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                <div className='mt-6 ml-2 text-white'>John Doe</div>
                            </div>
                        </div>
                    </div>
                    
                <div className='w-5/6 md:w-4/6 ml-10 md:ml-0 mb-20'>
                    <Tabs defaultValue="post" className="w-full">
                        <TabsList className="w-full bg-customColor1 p-1 rounded-lg">
                            <TabsTrigger 
                                value="post" 
                                className="w-1/2 py-2 text-white data-[state=active]:bg-customColor2 data-[state=active]:text-black rounded-md transition-all"
                            >
                                Posts
                            </TabsTrigger>
                            <TabsTrigger 
                                value="comments" 
                                className="w-1/2 py-2 text-white data-[state=active]:bg-customColor2 data-[state=active]:text-black rounded-md transition-all"
                            >
                                QnA
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="post">
                        <div className=' items-center flex justify-center flex-col'>
                            {posts.map((post) => (
                                <div key={post.id} className='w-80 md:w-130 md:max-h-140 mt-4 md:mt-8 ml-20 md:ml-0 rounded-2xl text-white bg-customColor1 max-h-96 mr-0 flex flex-shrink-0 mb-8 flex-col'>
                                    {post.image && <div 
                                        className='w-72 md:w-120 md:h-120 rounded-2xl h-72 m-2 ml-3 mt-3 flex bg-black'
                                        style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                    ></div>}
                                    <p className={`font-semibold text-lg ${post.image ? "p-2" : "px-4 pt-4 text-xl"} mt-5 ml-4 text-white`}>{post.text}</p>
                                    <div className='w-full h-32 ml-2 flex items-center justify-between'>
                                        <div className='flex items-center'>
                                            <div 
                                                className='w-12 h-12 flex-shrink-0 rounded-full'
                                                style={{ backgroundImage: `url(${post.postBy.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                            ></div>
                                            <div className='ml-2 text-white'>{post.postBy.name}</div>
                                        </div>
                                        <div className='flex items-center mr-8'>
                                            <button className='mr-4 flex gap-2' onClick={() => toggleLike(post.id)}>
                                                <motion.div
                                                    initial={{ scale: 1 }}
                                                    animate={{ scale: post.isLiked ? [1.2, 1.7, 1.2] : 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <Heart 
                                                        className={`${post.isLiked ? 'text-red-500' : 'text-white'} transition-colors duration-300`} 
                                                        size={24} 
                                                        fill={post.isLiked ? 'currentColor' : 'none'}
                                                    />
                                                </motion.div>
                                                <p>{post.likes.length}</p>
                                            </button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button variant="outline" className='flex gap-2'><MessageCircle/> {post.comments.length}</button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Comments</DialogTitle>
                                                        <DialogDescription>
                                                            View and add comments
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                                        {post.comments?.map((comment, index) => (
                                                            <div key={index} className="mb-4">
                                                                <p className="font-semibold">{comment.commentedBy?.name || 'Unknown User'}</p>
                                                                <p>{comment?.text}</p>
                                                            </div>
                                                        ))}
                                                    </ScrollArea>
                                                    <div className="grid gap-4 py-4">
                                                        <Textarea
                                                            placeholder="Add a comment"
                                                            value={newComment}
                                                            onChange={(e) => setNewComment(e.target.value)}
                                                        />
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={() => handleAddComment(post.id)}>Add Comment</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="comments">
                          <div className="min-h-screen bg-customColor1">
                            <div className="container mx-auto px-4 py-8">
                              <h1 className="text-4xl font-bold mb-6 text-white text-center">Travel Community Q&A</h1>
                              
                              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-grow">
                                  <Input
                                    type="text"
                                    placeholder="Search questions, answers, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/90 backdrop-blur-sm border-2 border-purple-300 focus:border-purple-500 rounded-full"
                                  />
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                                </div>
                                <Select onValueChange={setSortBy} defaultValue={sortBy}>
                                  <SelectTrigger className="w-full sm:w-[180px] bg-white/90 backdrop-blur-sm border-2 border-purple-300 focus:border-purple-500 rounded-full">
                                    <SelectValue placeholder="Sort by" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="mostHelpful">Most Helpful</SelectItem>
                                    <SelectItem value="leastHelpful">Least Helpful</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="mb-6 bg-green-500 hover:bg-green-600 text-white rounded-full">
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Ask a Question
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Ask a New Question</DialogTitle>
                                    <DialogDescription>
                                      Share your travel query with the community!
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="question" className="text-right">
                                        Question
                                      </label>
                                      <Textarea
                                        id="question"
                                        name="question"
                                        value={newQuestion.question}
                                        onChange={handleNewQuestionChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <label htmlFor="keywords" className="text-right">
                                        Keywords
                                      </label>
                                      <Input
                                        id="keywords"
                                        name="keywords"
                                        value={newQuestion.keywords}
                                        onChange={handleNewQuestionChange}
                                        placeholder="Comma-separated keywords"
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  <Button onClick={handleCreateQuestion}>Post Question</Button>
                                </DialogContent>
                              </Dialog>

                              <div className="space-y-6">
                                {filteredAndSortedQuestions.map((question) => (
                                  <div key={question.id} className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border-2 border-purple-300 hover:border-purple-500 transition-all duration-300">
                                    <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {question.tags.map((keyword, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-300 rounded-full text-sm">
                                          {keyword}
                                        </span>
                                      ))}
                                    </div>
                                    
                                    {question.answers?.map((answer) => (
                                      <div key={answer.id} className="bg-gray-300 p-4 rounded-md mb-4">
                                        <p className="text-gray-800 mb-2">{answer.answer}</p>
                                        <div className="flex items-center justify-between">
                                          <div className="text-sm">
                                            {answer.upvotes} found this helpful
                                          </div>
                                          <div className="flex gap-2">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleHelpful(question.id, answer.id, true)}
                                              className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
                                            >
                                              <ThumbsUp className="w-4 h-4 mr-2" />
                                              Helpful
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleHelpful(question.id, answer.id, false)}
                                              className="bg-red-100 hover:bg-red-200 text-red-700 border-red-300"
                                            >
                                              <ThumbsDown className="w-4 h-4 mr-2" />
                                              Not Helpful
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}

                                    <div className="mt-4">
                                      <Textarea
                                        placeholder="Write your answer here..."
                                        value={newAnswer.questionId === question.id ? newAnswer.answer : ""}
                                        onChange={(e) => handleNewAnswerChange(e, question.id)}
                                        className="w-full mb-2"
                                      />
                                      <Button onClick={() => handleCreateAnswer(question.id)}>Post Answer</Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        </Tabs>
                    </div>
                </div> 
                </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
                    <div className="bg-black opacity-50 fixed inset-0"></div>
                    <div className="bg-customColor1 p-8 rounded-xl shadow-lg relative z-50">
                        <h2 className="text-2xl font-bold mb-4 text-white">Create Post</h2>

                        
                        <div className="flex flex-col items-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="white"
                                className="w-16 h-16 mb-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7V6a4 4 0 014-4h10a4 4 0 014 4v1m-1 10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2v9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 13a3 3 0 100-6 3 3 0 000 6z"
                                />
                            </svg>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full p-2 border rounded mb-4"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setImage(file)
                                    console.log(file);
                                }}
                            />
                        </div>
                        <textarea
                            className="w-full p-2 border text-black  rounded mb-4"
                            placeholder="Share Your Experience..."
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleAddPost} 
                        >
                            Submit
                        </button>
                        <button
                            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={() => setModalOpen(false)} 
                        >
                            Cancel
                        </button>
                    </div>
                </div>
)}
{logOutBar && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
                    <div className="bg-black opacity-50 fixed inset-0"></div>
                    <div className="bg-customColor1 p-8 rounded-xl shadow-lg relative z-50">
                        <h2 className="text-2xl font-bold mb-4 text-white">Are You Sure You Want To LogOut?</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setLogoutBar(false)} 
                        >
                            Yes
                        </button>
                        <button
                            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={() => setLogoutBar(false)} 
                        >
                            No
                        </button>
                    </div>
                </div>
)}
{logOutBar && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
                    <div className="bg-black opacity-50 fixed inset-0"></div>
                    <div className="bg-customColor1 p-8 rounded-xl shadow-lg relative z-50">
                        <h2 className="text-2xl font-bold mb-4 text-white">Are You Sure You Want To LogOut?</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setLogoutBar(false)} 
                        >
                            Yes
                        </button>
                        <button
                            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={() => setLogoutBar(false)} 
                        >
                            No
                        </button>
                    </div>
                </div>
)}
        </>
    )
}

export default Community