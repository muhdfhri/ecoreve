import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Search,
  Mail,
  Building,
  CircleDot,
  CheckCircle2,
  Clock,
  Inbox,
  Trash2,
  MessageSquare,
  X,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";

export interface InquiryData {
  id: number;
  full_name: string;
  work_email: string;
  company_name: string;
  message: string;
  status: "pending" | "in_process" | "closed";
  created_at?: string;
}

interface InquiriesAdminViewProps {
  inquiries?: InquiryData[];
}

export const InquiriesAdminView: React.FC<InquiriesAdminViewProps> = ({ inquiries = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Modal State for View/Respond
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filter inquiries by Search & Status
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.work_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "ALL" || inquiry.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: number, newStatus: string) => {
    router.post(`/admin/inquiries/${id}/status`, { status: newStatus }, {
      onSuccess: () => {
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
        }
      },
    });
  };

  const handleDeleteInquiry = (id: number) => {
    router.post(`/admin/inquiries/${id}/delete`, {}, {
      onSuccess: () => {
        setIsDetailOpen(false);
        setSelectedInquiry(null);
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
            placeholder="Search inquiries by name, email, or company..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Status filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Inquiries ({inquiries.length})</option>
            <option value="pending">Pending</option>
            <option value="in_process">In Process</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* 2. DYNAMIC CONTENT AREA: TABLE OR GLOBAL EMPTY STATE */}
      {filteredInquiries.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={inquiries.length === 0 ? "No Inquiries Received Yet" : "No Matching Inquiries Found"}
          description={
            inquiries.length === 0
              ? "Your CRM mailbox is currently clean and empty. Inquiries submitted by clients via the contact page will automatically appear here for your review and follow-up."
              : "No inquiries matched your current search query or status filter. Try clearing the filter parameters."
          }
        />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3.5 font-bold">Contact Name</th>
                  <th className="p-3.5 font-bold">Company / Work Email</th>
                  <th className="p-3.5 font-bold">Message Snippet</th>
                  <th className="p-3.5 font-bold">Date Received</th>
                  <th className="p-3.5 font-bold">CRM Status</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-zinc-900 dark:text-white">
                      <div>{inquiry.full_name}</div>
                      <div className="text-[11px] font-normal text-zinc-400 flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3" />
                        {inquiry.work_email}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                        <Building className="h-3 w-3 text-zinc-400" />
                        {inquiry.company_name}
                      </div>
                    </td>
                    <td className="p-3.5 font-medium text-zinc-600 dark:text-zinc-300 max-w-xs truncate">
                      {inquiry.message}
                    </td>
                    <td className="p-3.5 font-mono text-zinc-500 dark:text-zinc-400">
                      {inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString() : "Just now"}
                    </td>
                    <td className="p-3.5">
                      {inquiry.status === "pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 text-[11px] font-semibold">
                          <Clock className="h-3 w-3" />
                          Pending
                        </span>
                      )}
                      {inquiry.status === "in_process" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 text-[11px] font-semibold">
                          <CircleDot className="h-3 w-3 animate-spin" />
                          In Process
                        </span>
                      )}
                      {inquiry.status === "closed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[11px] font-semibold">
                          <CheckCircle2 className="h-3 w-3" />
                          Closed
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedInquiry(inquiry); setIsDetailOpen(true); }}
                          className="px-3 py-1 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                        >
                          View Inquiry
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                          className="p-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete Inquiry"
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

      {/* 3. INQUIRY DETAIL & CRM RESPOND MODAL */}
      {isDetailOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Inquiry Details (#{selectedInquiry.id})
              </h3>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-zinc-400 font-medium">Contact Name</span>
                  <div className="font-bold text-zinc-900 dark:text-white text-sm mt-0.5">{selectedInquiry.full_name}</div>
                </div>
                <div>
                  <span className="text-zinc-400 font-medium">Company Name</span>
                  <div className="font-bold text-zinc-900 dark:text-white text-sm mt-0.5">{selectedInquiry.company_name}</div>
                </div>
                <div className="col-span-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-400 font-medium">Work Email</span>
                  <div className="font-mono text-zinc-900 dark:text-white mt-0.5">{selectedInquiry.work_email}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-900 dark:text-white">Message / Operational Requirement</label>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5 pt-2">
                <label className="font-bold text-zinc-900 dark:text-white">Update CRM Follow-up Status</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "pending")}
                    className={`flex-1 py-2 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
                      selectedInquiry.status === "pending"
                        ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "in_process")}
                    className={`flex-1 py-2 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
                      selectedInquiry.status === "in_process"
                        ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    In Process
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "closed")}
                    className={`flex-1 py-2 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
                      selectedInquiry.status === "closed"
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
