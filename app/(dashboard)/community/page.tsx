"use client";

import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Image from "next/image";
import {
    MessageSquare,
    Heart,
    Share2,
    Search,
    Users,
    Video,
    Mic,
    Image as ImageIcon,
    Link as LinkIcon,
    Send,
    MoreHorizontal,
    Plus,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

interface Post {
    id: string;
    author: {
        name: string;
        avatar?: string;
        title: string;
        time: string; // Display time, we'll calc from timestamp
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    tags: string[];
    timestamp?: Timestamp;
}

export default function CommunityPage() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Real-time listener for posts
    useEffect(() => {
        // Query posts ordered by timestamp
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPosts = snapshot.docs.map(doc => {
                const data = doc.data();
                // Handle timestamp conversion
                let timeDisplay = 'Just now';
                if (data.timestamp) {
                    const date = data.timestamp.toDate();
                    timeDisplay = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    // If it's older than 24h, show date
                    if (Date.now() - date.getTime() > 86400000) {
                        timeDisplay = date.toLocaleDateString();
                    }
                }

                return {
                    id: doc.id,
                    ...data,
                    author: {
                        ...data.author,
                        time: timeDisplay
                    }
                } as Post;
            });
            setPosts(fetchedPosts);
        }, (error) => {
            console.error("Error fetching posts:", error);
            toast.error("Failed to load live feed.");
        });

        return () => unsubscribe();
    }, []);

    const handleCreatePost = async () => {
        if (!newPostContent.trim() && !selectedImage) return;
        if (!session?.user) {
            toast.error("You must be logged in to post.");
            return;
        }

        setIsPosting(true);
        try {
            let imageUrl = undefined;

            // Upload image if selected
            // Upload image if selected
            if (selectedImage) {
                if (!storage) {
                    throw new Error("Firebase Storage is not initialized");
                }
                const storageRef = ref(storage, `posts/${Date.now()}_${selectedImage.name}`);
                await uploadBytes(storageRef, selectedImage);
                imageUrl = await getDownloadURL(storageRef);
            }

            await addDoc(collection(db, "posts"), {
                author: {
                    name: session.user.name || "Anonymous Scholar",
                    title: session.user.email || "Researcher",
                },
                content: newPostContent,
                image: imageUrl,
                likes: 0,
                comments: 0,
                tags: ["#General"],
                timestamp: serverTimestamp(),
            });

            setNewPostContent("");
            setSelectedImage(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            toast.success("Post published!");
        } catch (error: any) {
            console.error("Error creating post:", error);
            if (error.code === 'permission-denied') {
                toast.error("Permission denied. Please refresh to restore authentication.");
            } else if (error.code === 'storage/unauthorized') {
                toast.error("Image upload failed. Permission denied.");
            } else {
                toast.error(`Failed: ${error.message || "Unknown error"}`);
            }
        } finally {
            setIsPosting(false);
        }
    };

    const handleJoinRoom = () => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: "Connecting to secure room...",
            success: "Joined 'Thesis Defense Prep' (Simulated)",
            error: "Failed to join room",
        });
    };

    const handleNewDiscussion = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const input = document.getElementById("post-input");
        if (input) input.focus();
        toast.info("Start a new discussion by posting here.");
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File is too large (max 5MB)");
                return;
            }
            setSelectedImage(file);
            toast.success(`Image selected: ${file.name}`);
        }
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Community" },
                    { label: "Scholar Connect", href: "/community" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8">
                    {/* Left Sidebar: Navigation & Communities */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-8 sticky top-8 h-fit">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search discussions..."
                                className="w-full bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        {/* Menu */}
                        <div className="space-y-1">
                            <button className="w-full flex items-center justify-between px-4 py-2.5 bg-primary/10 text-primary rounded-xl font-bold text-sm">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>Discussions</span>
                                </div>
                                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">
                                    {posts.length}
                                </span>
                            </button>
                            <button className="w-full flex items-center justify-between px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium text-sm transition-colors">
                                <div className="flex items-center gap-3">
                                    <Users className="w-4 h-4" />
                                    <span>My Communities</span>
                                </div>
                            </button>
                            <button className="w-full flex items-center justify-between px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium text-sm transition-colors">
                                <div className="flex items-center gap-3">
                                    <Video className="w-4 h-4" />
                                    <span>Live Sessions</span>
                                </div>
                                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                                    Live
                                </span>
                            </button>
                        </div>

                        {/* Active Communities */}
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                                Popular Topics
                            </h3>
                            <div className="space-y-2">
                                {["#QuantitativeAnalysis", "#AcademicWriting", "#PhDLife", "#GrantFunding"].map((tag) => (
                                    <div key={tag} className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg group">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-card-dark flex items-center justify-center text-slate-500 font-bold text-lg">
                                            #
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors">
                                                {tag.replace("#", "")}
                                            </p>
                                            <p className="text-[10px] text-slate-500">1.2k members</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Feed */}
                    <main className="col-span-1 lg:col-span-6 space-y-6">
                        {/* Live Session Banner */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-500/20">
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                            LIVE NOW
                                        </span>
                                        <span className="text-indigo-100 text-xs">Started 12 mins ago</span>
                                    </div>
                                    <h2 className="text-xl font-bold mb-1">Thesis Defense Prep: Q&A</h2>
                                    <p className="text-indigo-100 text-sm">
                                        Host: Dr. Sarah Mitchell • 142 listening
                                    </p>
                                </div>
                                <button
                                    onClick={handleJoinRoom}
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                                >
                                    Join Room
                                </button>
                            </div>
                            {/* Decorative circles */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
                        </div>

                        {/* Create Post */}
                        <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark p-4 shadow-sm">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center font-bold text-slate-500">
                                    {(session?.user?.name?.[0] || "U").toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        id="post-input"
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        placeholder="Share your research progress or ask a question..."
                                        className="w-full bg-slate-50 dark:bg-[#151b26] border-none rounded-xl p-3 text-sm focus:ring-1 focus:ring-primary outline-none resize-none min-h-[100px]"
                                    />
                                    <div className="flex justify-between items-center mt-3">
                                        <div className="flex gap-2 items-center">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <button onClick={handleImageClick} className={`p-2 rounded-lg transition-colors ${selectedImage ? "text-primary bg-primary/10" : "text-slate-400 hover:text-primary hover:bg-primary/5"}`} title="Add Image">
                                                <ImageIcon className="w-5 h-5" />
                                            </button>
                                            {selectedImage && (
                                                <span className="text-xs text-primary font-medium truncate max-w-[100px]">
                                                    {selectedImage.name}
                                                </span>
                                            )}
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Add Link">
                                                <LinkIcon className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Add Poll">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleCreatePost}
                                            disabled={isPosting || !newPostContent.trim()}
                                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-hover transition-colors disabled:opacity-50"
                                        >
                                            <Send className="w-4 h-4" />
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feed */}
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark p-5 shadow-sm hover:border-primary/20 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                                                {post.author.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                                                    {post.author.name}
                                                </h3>
                                                <p className="text-xs text-slate-500">
                                                    {post.author.title} • {post.author.time}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                                        {post.content}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex gap-2 mb-4">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="text-xs text-primary bg-primary/5 px-2 py-1 rounded-md font-medium"> # {tag} </span>
                                        ))}
                                    </div>

                                    {/* Real Image Rendering */}
                                    {post.image && (
                                        <div className="mb-4 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                                            <Image
                                                src={post.image}
                                                alt="Post attachment"
                                                width={800}
                                                height={600}
                                                className="w-full h-auto max-h-[400px] object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors text-sm group">
                                            <Heart className="w-5 h-5 group-hover:fill-red-500" />
                                            <span>{post.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm">
                                            <MessageSquare className="w-5 h-5" />
                                            <span>{post.comments}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm ml-auto">
                                            <Share2 className="w-5 h-5" />
                                            <span>Share</span>
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {posts.length === 0 && (
                                <div className="text-center py-10 text-slate-500">
                                    No posts yet. Be the first to start a discussion!
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Right Sidebar: Suggestions */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-8 h-fit">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                New Discussions
                            </h3>
                            <button onClick={handleNewDiscussion} className="flex items-center gap-1 text-primary text-xs font-bold hover:underline">
                                <Plus className="w-3 h-3" /> New
                            </button>
                        </div>

                        {/* Event Card */}
                        <div className="bg-slate-900 rounded-xl p-5 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-xs font-bold text-indigo-300 uppercase mb-2">
                                    Upcoming Webinar
                                </p>
                                <h3 className="font-bold text-lg mb-1">
                                    Academic Writing Masterclass
                                </h3>
                                <p className="text-sm text-slate-300 mb-4">
                                    Tomorrow • 10:00 AM EST
                                </p>
                                <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                                    Register Free
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                        </div>

                        {/* Who to follow */}
                        <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                                Scholars to Follow
                            </h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                                    Dr. Alex Chen
                                                </h4>
                                                <p className="text-[10px] text-slate-500">
                                                    Quantum Physics
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-primary hover:bg-primary/5 p-1.5 rounded-lg transition-colors">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
