import React, { useState } from "react";
import {
  Inbox,
  Mail,
  Building,
  Clock,
  CircleDot,
  CheckCircle2,
  X,
  MessageSquare,
  UserX,
} from "lucide-react";
import { InquiryData } from "../views/InquiriesAdminView";
import { EmptyState } from "@/Components/ui/EmptyState";

interface OverviewRecentTableCardProps {
  recentInquiries?: InquiryData[];
}

export const OverviewRecentTableCard: React.FC<OverviewRecentTableCardProps> = ({
  recentInquiries = [],
}) => {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const actualList = recentInquiries || [];

  return (
    <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2 transition-all font-sans">
      
      {/* Outer Card Header */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 tracking-tight truncate">
          Recent Client Inquiries Monitoring
        </span>
        <div className="text-zinc-400 dark:text-zinc-500 p-0.5 shrink-0">
          <Inbox className="h-4 w-4" />
        </div>
      </div>

      {/* Inner Raised White Card Box */}
      <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-2xs space-y-4 overflow-hidden">
        
        {/* Sub-Header info bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-dashed border-zinc-200 dark:border-zinc-800 text-xs">
          <p className="text-zinc-400 dark:text-zinc-500 font-medium">
            Latest client inquiries submitted via website contact portal (Real SQL Feed)
          </p>
          <div className="px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-bold shrink-0">
            {actualList.length} Inquiries Logged
          </div>
        </div>

        {/* Table Content OR Empty State */}
        {actualList.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={UserX}
              title="No Client Inquiries Logged Yet"
              description="There are currently no client inquiries recorded in the database. When visitors submit contact forms, they will appear here in real-time."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3.5 font-bold">Ticket ID</th>
                  <th className="p-3.5 font-bold">Client Contact</th>
                  <th className="p-3.5 font-bold">Company Entity</th>
                  <th className="p-3.5 font-bold">Message Snippet</th>
                  <th className="p-3.5 font-bold">Created Date</th>
                  <th className="p-3.5 font-bold">Status</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {actualList.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3.5 font-mono text-zinc-900 dark:text-white font-bold">
                      #{inquiry.id}
                    </td>

                    <td className="p-3.5 font-bold text-zinc-900 dark:text-white">
                      <div>{inquiry.full_name || "Anonymous Client"}</div>
                      <div className="text-[11px] font-normal text-zinc-400 flex items-center gap-1 mt-0.5 font-mono">
                        <Mail className="h-3 w-3 shrink-0" />
                        {inquiry.work_email || "N/A"}
                      </div>
                    </td>

                    <td className="p-3.5 font-semibold text-zinc-800 dark:text-zinc-200">
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3 text-zinc-400 shrink-0" />
                        {inquiry.company_name || "General Client"}
                      </div>
                    </td>

                    <td className="p-3.5 text-zinc-600 dark:text-zinc-300 max-w-xs truncate font-medium">
                      {inquiry.message || "No message snippet"}
                    </td>

                    <td className="p-3.5 font-mono text-zinc-500 text-[11px]">
                      {inquiry.created_at && !isNaN(Date.parse(inquiry.created_at))
                        ? new Date(inquiry.created_at).toLocaleDateString()
                        : "Recently"}
                    </td>

                    <td className="p-3.5">
                      {inquiry.status === "pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 text-[11px] font-bold border border-amber-200/60 dark:border-amber-800/40">
                          <Clock className="h-3 w-3" />
                          Pending
                        </span>
                      )}
                      {inquiry.status === "in_process" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 text-[11px] font-bold border border-blue-200/60 dark:border-blue-800/40">
                          <CircleDot className="h-3 w-3 animate-spin" />
                          In Process
                        </span>
                      )}
                      {inquiry.status === "closed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200/60 dark:border-emerald-800/40">
                          <CheckCircle2 className="h-3 w-3" />
                          Closed
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => { setSelectedInquiry(inquiry); setIsModalOpen(true); }}
                        className="px-3 py-1 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Inquiry Detail Quick Modal */}
      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#005883]" />
                Inquiry Details (#{selectedInquiry.id})
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-zinc-400 font-medium">Contact Name</span>
                  <div className="font-bold text-zinc-900 dark:text-white text-sm mt-0.5">{selectedInquiry.full_name || "N/A"}</div>
                </div>
                <div>
                  <span className="text-zinc-400 font-medium">Company Name</span>
                  <div className="font-bold text-zinc-900 dark:text-white text-sm mt-0.5">{selectedInquiry.company_name || "N/A"}</div>
                </div>
                <div className="col-span-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-400 font-medium">Work Email</span>
                  <div className="font-mono text-zinc-900 dark:text-white mt-0.5">{selectedInquiry.work_email || "N/A"}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-900 dark:text-white">Message / Requirement</label>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
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
