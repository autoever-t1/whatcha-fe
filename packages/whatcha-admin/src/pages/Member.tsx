import UserPieChart from '../components/member/UserPieChart';
import UserTable from '../components/member/UserTable';
import { useUserAgeStats, useUserGenderStats } from '../hooks/useMember';

function Member() {
  const { data: ageStats, isLoading: ageLoading } = useUserAgeStats();
  const { data: genderStats, isLoading: genderLoading } = useUserGenderStats();

  const ageData = {
    labels: ageStats?.statistics.map(stat => `${stat.ageRange}대`) ?? [],
    data: ageStats?.statistics.map(stat => stat.count) ?? []
  };

  const genderData = {
    labels: genderStats?.statistics.map(stat => stat.gender) ?? [],
    data: genderStats?.statistics.map(stat => stat.count) ?? []
  };

  if (ageLoading || genderLoading) return <div>로딩 중...</div>;


  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
        <p className="mt-1 text-gray-500">회원 현황</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">회원 나이</h2>
          <UserPieChart 
            labels={ageData.labels} 
            data={ageData.data} 
          />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">회원 성별</h2>
          <UserPieChart 
            labels={genderData.labels} 
            data={genderData.data}
            colors={{
              background: ['rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)'],
              border: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)']
            }}
          />
        </div>
        <div className="col-span-4 bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="mb-4 text-lg font-semibold">회원 정보</h2>
            <UserTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Member;