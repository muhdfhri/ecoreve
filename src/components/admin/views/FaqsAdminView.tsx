import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Plus,
  Search,
  HelpCircle,
  Edit,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";

export interface FaqData {
  id: number;
  question: string;
  answer: string;
  sort_order?: number;
  created_at?: string;
}

interface FaqsAdminViewProps {
  faqs?: FaqData[];
}

export const FaqsAdminView: React.FC<FaqsAdminViewProps> = ({ faqs = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form State
  const [selectedFaq, setSelectedFaq] = useState<FaqData | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    sort_order: 1,
  });

  // Default fallback sample FAQs if DB is empty
  const defaultFaqs: FaqData[] = [
    {
      id: 1,
      question: "DO YOU MANUFACTURE THE EQUIPMENT USED TO BUILD THE WATER TREATMENT PLANTS?",
      answer: "Yes. We're a true OEM, not a broker. We own the design, the engineering, and the supply chain for all industrial water & wastewater infrastructure.",
      sort_order: 1,
    },
    {
      id: 2,
      question: "WHAT PRODUCTS DO YOU OFFER?",
      answer: "We engineer containerized & skid-mounted Demineralization Plants, Softener Systems, DAF Flotation units, Geotube Dewatering systems, and High-Performance Butterfly Valves.",
      sort_order: 2,
    },
    {
      id: 3,
      question: "CAN YOU HANDLE CUSTOM SPECS?",
      answer: "Absolutely. Every industrial plant requires unique flow rates, chemical pH tolerances, and telemetry integration. Our engineering team custom builds systems accordingly.",
      sort_order: 3,
    },
  ];

  const actualFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  // Filter FAQs by Search
  const filteredFaqs = actualFaqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      question: "",
      answer: "",
      sort_order: actualFaqs.length + 1,
    });
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (faq: FaqData) => {
    setSelectedFaq(faq);
    setFormData({
      question: faq.question || "",
      answer: faq.answer || "",
      sort_order: faq.sort_order || 1,
    });
    setIsEditOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (faq: FaqData) => {
    setSelectedFaq(faq);
    setIsDeleteOpen(true);
  };

  // Submit Create FAQ
  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/faqs", formData, {
      onSuccess: () => {
        setIsCreateOpen(false);
      },
    });
  };

  // Submit Edit FAQ
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFaq) return;

    router.post(`/admin/faqs/${selectedFaq.id}/update`, formData, {
      onSuccess: () => {
        setIsEditOpen(false);
        setSelectedFaq(null);
      },
    });
  };

  // Submit Delete FAQ
  const handleSubmitDelete = () => {
    if (!selectedFaq) return;

    router.post(`/admin/faqs/${selectedFaq.id}/delete`, {}, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedFaq(null);
      },
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. TOP TOOLBAR & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by question or answer keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* 2. FAQS DATA TABLE OR EMPTY STATE */}
      {filteredFaqs.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title="No FAQ Items Found"
          description={
            searchQuery
              ? `No FAQ questions matched your search term "${searchQuery}". Try searching with another keyword.`
              : "No FAQ items created yet. Click the 'Add FAQ Item' button above to create one."
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add FAQ Item"}
          onAction={searchQuery ? () => setSearchQuery("") : handleOpenCreate}
        />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3.5 font-bold">Sort</th>
                  <th className="p-3.5 font-bold">Question Title</th>
                  <th className="p-3.5 font-bold">Answer Details</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredFaqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3.5 font-mono text-zinc-400">
                      #{faq.sort_order || faq.id}
                    </td>
                    <td className="p-3.5 font-bold text-zinc-900 dark:text-white max-w-xs">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-blue-600 shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-zinc-500 dark:text-zinc-400 max-w-md">
                      <p className="line-clamp-2">{faq.answer}</p>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(faq)}
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer"
                          title="Edit FAQ"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(faq)}
                          className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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

      {/* 3. CREATE FAQ MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Add New FAQ
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Question <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. WHAT IS THE WARRANTY ON YOUR DAF FLOTATION UNITS?"
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Answer Content <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Write clear, comprehensive answer for clients..."
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Display Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT FAQ MODAL */}
      {isEditOpen && selectedFaq && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Edit FAQ (#{selectedFaq.id})
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Question</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Answer Content</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Display Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Update FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && selectedFaq && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-950/40">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Delete FAQ</h3>
                <p className="text-xs text-zinc-500">Are you sure you want to remove this question?</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              "{selectedFaq.question}"
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
