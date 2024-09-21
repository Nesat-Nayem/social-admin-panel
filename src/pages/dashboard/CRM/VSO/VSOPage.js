import { useAuthContext } from 'auth/useAuthContext';
import { useSelector } from 'react-redux';
import VSOVisitEntrysPage from './VSOVisitEntrysPage';
import VSOVisitExitPage from './VSOVisitExitPage';
import VSOVisitPage from './VSOVisitPage';

function VSOPage() {
  const { isVsoStartVisit, isVsoEndVisit, isVsoDoctorVisit, vsoStep, vso } = useSelector(
    (state) => state.vso
  );
  console.log({ isVsoStartVisit, isVsoEndVisit, isVsoDoctorVisit });
  const { user } = useAuthContext();
  const matchVsoId = vso?.visitor_id === user?.id;
  return (
    <div>
      {matchVsoId ? (
        <>
          {vsoStep === 0 && <VSOVisitPage />}
          {vsoStep === 1 && <VSOVisitEntrysPage />}
          {vsoStep === 2 && <VSOVisitExitPage />}
        </>
      ) : (
        <VSOVisitPage />
      )}
    </div>
  );
}

export default VSOPage;
