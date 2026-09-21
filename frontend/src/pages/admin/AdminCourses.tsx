import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Clock,
  Layers,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import {
  adminGetCourses,
  adminCreateCourse,
  adminUpdateCourse,
  adminDeleteCourse
} from '@/services/adminApi';
import { CourseApiModel, CourseModule } from '@/services/courseApi';

const DEFAULT_COURSE_PRESETS = [
  { name: 'AC & Refrigeration', img: '/courses/ac-repair-course.jpg' },
  { name: 'Beautician & Wellness', img: '/courses/beautician-training-course.jpg' },
  { name: 'Cutting & Tailoring', img: '/courses/cutting-tailoring-course.jpg' },
  { name: 'Digital Marketing', img: '/courses/digital-marketing.jpg' },
  { name: 'Bakery & Confectionery', img: '/courses/bakery-course.jpg' },
  { name: 'Video Editing', img: '/courses/video-editing.jpg' },
  { name: 'AI & Prompt Engineering', img: '/courses/ai-prompt-engineering.jpg' },
  { name: 'Mobile / Flutter App', img: '/courses/flutter-app.jpg' },
  { name: 'Carpenter Training', img: '/courses/carpenter-training.jpg' },
  { name: 'General Duty Assistant', img: '/courses/gda-course.jpg' },
];

export default function AdminCourses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<CourseApiModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseApiModel | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Community');
  const [duration, setDuration] = useState('3 Months');
  const [language, setLanguage] = useState('Hindi');
  const [certification, setCertification] = useState('BDSN / KVIC');
  const [overview, setOverview] = useState('');
  const [eligibility, setEligibility] = useState('Open to all youth looking for employment or self-employment');
  const [imageUrl, setImageUrl] = useState('');
  const [isCDC, setIsCDC] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [modules, setModules] = useState<CourseModule[]>([
    { moduleNumber: 1, title: 'Introduction & Fundamentals', description: 'Basics of the trade and practical safety guidelines.' }
  ]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await adminGetCourses();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Check if opened with ?add=true
  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      handleOpenAddModal();
      searchParams.delete('add');
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingCourse) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setTitle('');
    setSlug('');
    setCategory('Community');
    setDuration('3 Months');
    setLanguage('Hindi');
    setCertification('BDSN / KVIC');
    setOverview('Comprehensive practical and theoretical training designed for skill development and employment.');
    setEligibility('Open to all youth looking for employment or self-employment');
    setImageUrl('/courses/ac-repair-course.jpg');
    setIsCDC(false);
    setIsActive(true);
    setModules([
      { moduleNumber: 1, title: 'Introduction & Fundamentals', description: 'Core principles and overview of the course curriculum.' },
      { moduleNumber: 2, title: 'Practical Hand-on Sessions', description: 'Practical training under experienced industry trainers.' }
    ]);
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course: CourseApiModel) => {
    setEditingCourse(course);
    setTitle(course.title);
    setSlug(course.slug);
    setCategory(course.category || 'Community');
    setDuration(course.duration || '3 Months');
    setLanguage(course.language || 'Hindi');
    setCertification(course.certification || 'BDSN / KVIC');
    setOverview(course.overview || '');
    setEligibility(course.eligibility || '');
    setImageUrl(course.imageUrl || '');
    setIsCDC(!!course.isCDC);
    setIsActive(course.isActive !== false);
    setModules(
      course.modules && course.modules.length
        ? course.modules
        : [{ moduleNumber: 1, title: 'Course Core Curriculum', description: 'Practical and classroom training.' }]
    );
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        moduleNumber: modules.length + 1,
        title: '',
        description: ''
      }
    ]);
  };

  const handleRemoveModule = (index: number) => {
    setModules(modules.filter((_, idx) => idx !== index));
  };

  const handleModuleChange = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...modules];
    updated[index] = { ...updated[index], [field]: value };
    setModules(updated);
  };

  const handleSubmitCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !overview.trim()) {
      setFormError('Please fill in required fields: Course Title, Slug, and Overview.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      const coursePayload: Partial<CourseApiModel> = {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        category,
        duration,
        language,
        certification,
        overview,
        eligibility,
        imageUrl: imageUrl.trim() || '/courses/ac-repair-course.jpg',
        isCDC: isCDC || category.includes('CDC'),
        isActive,
        modules: modules.filter((m) => m.title.trim())
      };

      if (editingCourse) {
        const idOrSlug = editingCourse._id || editingCourse.slug;
        await adminUpdateCourse(idOrSlug, coursePayload);
        setFormSuccess('Course updated successfully!');
      } else {
        await adminCreateCourse(coursePayload);
        setFormSuccess('New course published successfully! It is now live on the website.');
      }

      await fetchCourses();
      setTimeout(() => {
        setIsModalOpen(false);
      }, 800);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save course. Please check fields.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteCourse = async (course: CourseApiModel) => {
    const confirmMessage = `Are you sure you want to delete "${course.title}"? This action cannot be undone.`;
    if (!window.confirm(confirmMessage)) return;

    try {
      const idOrSlug = course._id || course.slug;
      await adminDeleteCourse(idOrSlug);
      setCourses(courses.filter((c) => (c._id ? c._id !== course._id : c.slug !== course.slug)));
      alert(`Course "${course.title}" has been deleted.`);
    } catch (err: any) {
      alert(err.message || 'Failed to delete course');
    }
  };

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.overview && c.overview.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'CDC' && (c.isCDC || c.category?.includes('CDC'))) ||
      c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-amber-500" />
            Courses Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, update, manage syllabus, and publish training courses live on the website.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-orange-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Course</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
          {['All', 'Community', 'CDC', 'Technical', 'Vocational'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'CDC' ? 'Career Development (CDC)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List Table / Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-2" />
          <p className="text-xs">Loading courses list...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto stroke-1 mb-2 text-slate-300" />
          <p className="text-base font-semibold text-slate-700">No courses found</p>
          <p className="text-xs text-slate-400 mt-1">Try changing search filters or click "+ Add New Course"</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Modules</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map((course) => (
                  <tr key={course._id || course.slug} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {course.imageUrl ? (
                            <img
                              src={course.imageUrl}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <BookOpen className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 leading-snug">{course.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">/courses/{course.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${
                          course.isCDC || course.category?.includes('CDC')
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {course.category || 'Community'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration || '3 Months'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      {course.modules?.length || 0} Modules
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          course.isActive !== false
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            course.isActive !== false ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {course.isActive !== false ? 'Live' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/courses/${course.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Preview public page"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleOpenEditModal(course)}
                          title="Edit course details"
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteCourse(course)}
                          title="Delete course"
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Course Modal (Add / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {editingCourse ? 'Edit Course Details' : 'Create & Publish New Course'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill the form to update or list a course on Samarth Bharat portal
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitCourse} className="flex-1 overflow-y-auto p-6 space-y-6">
              {formError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Solar Panel Technician"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    URL Slug * (auto-generated)
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. solar-panel-technician"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Category, Duration, Language */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (e.target.value.includes('CDC')) setIsCDC(true);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Community">Community Training</option>
                    <option value="Career Development Centre (CDC)">Career Development (CDC)</option>
                    <option value="Technical">Technical Course</option>
                    <option value="Vocational">Vocational Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 Months / 6 Months"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Instruction Language
                  </label>
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g. Hindi / Bilingual"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Certification & Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Certification
                  </label>
                  <input
                    type="text"
                    value={certification}
                    onChange={(e) => setCertification(e.target.value)}
                    placeholder="e.g. BDSN / KVIC Certification"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Eligibility
                  </label>
                  <input
                    type="text"
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                    placeholder="e.g. 10th Pass / Youth"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Image URL & Quick Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Course Thumbnail / Image Path
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/courses/ac-repair-course.jpg or https://..."
                    className="flex-1 px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                {/* Preset image buttons */}
                <div className="mt-2">
                  <span className="text-[11px] text-slate-500">Or pick from existing templates:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {DEFAULT_COURSE_PRESETS.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setImageUrl(p.img)}
                        className={`px-2 py-1 text-[10px] rounded-md border transition-colors ${
                          imageUrl === p.img
                            ? 'bg-amber-50 border-amber-400 text-amber-800 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Overview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Course Overview & Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Detailed explanation of what the course covers, benefits for students, job opportunities..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Course Modules / Syllabus */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Course Curriculum Modules ({modules.length})
                    </h4>
                    <p className="text-[11px] text-slate-500">Add syllabus topics taught in this course</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Add Module
                  </button>
                </div>

                <div className="space-y-2.5">
                  {modules.map((m, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-amber-700">Module {idx + 1}</span>
                        {modules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveModule(idx)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Module Title (e.g. Practical Assembly & Safety)"
                        value={m.title}
                        onChange={(e) => handleModuleChange(idx, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Module Description (e.g. Tools, maintenance, diagnostic techniques)"
                        value={m.description}
                        onChange={(e) => handleModuleChange(idx, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and CDC Switches */}
              <div className="flex items-center gap-6 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <span>Publish & Make Visible on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={isCDC}
                    onChange={(e) => setIsCDC(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                  />
                  <span>Show under Career Development Centre (CDC)</span>
                </label>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-orange-600/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingCourse ? 'Update Course' : 'Publish Course'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
