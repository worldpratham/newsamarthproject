import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getTeamMembers, TeamMemberApiModel } from '@/services/teamApi';
import { getReports, ReportApiModel } from '@/services/reportApi';

// Exact Elementor SVG Angle Right for icon list
const AngleRightIcon = () => (
  <svg
    aria-hidden="true"
    className="w-2.5 h-3.5 fill-[#001C5C] group-hover:fill-[#F87902] transition-colors shrink-0 mt-1"
    viewBox="0 0 256 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
  </svg>
);

export default function ProjectTeam() {
  const [members, setMembers] = useState<TeamMemberApiModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearlyReportsList, setYearlyReportsList] = useState<ReportApiModel[]>([]);
  const [monthlyReportsList, setMonthlyReportsList] = useState<ReportApiModel[]>([]);

  useEffect(() => {
    document.title = 'Project Team - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let isMounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        console.log('[ProjectTeam Page] Fetching dynamic team members and reports from API...');
        const [teamData, yearlyData, monthlyData] = await Promise.all([
          getTeamMembers(),
          getReports('yearly'),
          getReports('monthly'),
        ]);

        if (isMounted) {
          setMembers(teamData);
          setYearlyReportsList(yearlyData);
          setMonthlyReportsList(monthlyData);
        }
      } catch (err) {
        console.error('[ProjectTeam Page] Error loading data:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner with exact purple-blue gradient matching WordPress */}
      <section
        className="py-14 sm:py-16 md:py-20 text-center text-white"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10">
          <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight mb-3">
            Project Team
          </h1>
          <p className="font-['Montserrat',sans-serif] text-white/95 text-sm sm:text-base md:text-[17px] max-w-3xl mx-auto font-normal">
            Our team works passionately to turn ideas into action and vision into reality.
          </p>
        </div>
      </section>

      {/* Team Members List */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
          {loading ? (
            <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
              <Loader2 size={36} className="animate-spin text-[#F87902]" />
              <p className="text-slate-500 text-sm font-['Montserrat',sans-serif]">Loading team members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">
              No team members found.
            </div>
          ) : (
            <div className="space-y-12">
              {members.map((member, idx) => (
                <div
                  key={member._id || idx}
                  className="flex flex-col md:flex-row items-start gap-6 lg:gap-8 pb-10 border-b border-gray-100 last:border-b-0"
                >
                  {/* Member Photo */}
                  <div className="w-full sm:w-48 md:w-44 lg:w-48 shrink-0 flex justify-center md:justify-start">
                    <div className="w-40 sm:w-44 lg:w-48 aspect-square rounded-[10%] overflow-hidden border border-gray-200 shadow-xs bg-gray-50 flex items-center justify-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          if (member.wpImage && (e.target as HTMLImageElement).src !== member.wpImage) {
                            (e.target as HTMLImageElement).src = member.wpImage;
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="flex-1">
                    {/* Name */}
                    <h2 className="font-serif text-[#001C5C] text-2xl sm:text-[26px] font-bold leading-tight mb-1">
                      {member.name}
                    </h2>

                    {/* Role / Designation */}
                    <p className="font-['Montserrat',sans-serif] text-[#F87902] font-semibold text-[14px] sm:text-[15px] mb-3">
                      {member.role}
                    </p>

                    {/* Bio / Description from Database */}
                    <div
                      className="font-['Montserrat',sans-serif] text-[#555555] text-[13.5px] sm:text-[14px] leading-[1.8] text-left sm:text-justify space-y-2.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_b]:text-gray-900 [&_strong]:text-gray-900"
                      dangerouslySetInnerHTML={{ __html: member.bio }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reports Section (Matches WordPress Elementor Section 6796b3a on samarthbharat.net/project-team/) */}
      <section className="py-8 sm:py-12 md:py-14 bg-white border-t border-gray-100">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="space-y-8">
            {/* 1. Yearly Reports */}
            <div>
              <h4
                className="text-[24px] font-semibold text-[#B80505] leading-tight m-0 mb-3"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Yearly Reports
              </h4>

              <ul className="space-y-1.5 p-0 m-0 list-none">
                {yearlyReportsList.map((report) => (
                  <li key={report._id || report.label} className="elementor-icon-list-item">
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2.5 font-['Poppins',sans-serif] text-[16px] font-normal text-[#001C5C] hover:text-[#F87902] transition-colors py-0.5 group leading-normal"
                    >
                      <AngleRightIcon />
                      <span className="elementor-icon-list-text">{report.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Monthly Reports */}
            <div>
              <h4
                className="text-[24px] font-semibold text-[#B80505] leading-tight m-0 mb-3"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Monthly Reports
              </h4>

              <ul className="space-y-1.5 p-0 m-0 list-none">
                {monthlyReportsList.map((report, idx) => {
                  if (report.isYearHeader) {
                    return (
                      <li key={`year-${report.label}-${idx}`} className="pt-3 pb-1">
                        <a
                          href={report.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-['Poppins',sans-serif] font-bold text-[16px] text-[#001C5C] hover:text-[#F87902] transition-colors block"
                        >
                          <b>{report.label}</b>
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={report._id || `report-${report.label}-${idx}`} className="elementor-icon-list-item">
                      <a
                        href={report.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2.5 font-['Poppins',sans-serif] text-[16px] font-normal text-[#001C5C] hover:text-[#F87902] transition-colors py-0.5 group leading-normal"
                      >
                        <AngleRightIcon />
                        <span className="elementor-icon-list-text">{report.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
