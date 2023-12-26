import { useParams } from "react-router-dom";

const RepoPage = () => {
  const params = useParams();
  const { ownerName: owner, repoName: name } = params;

  return (
    <div>
      <p>Owner: {owner}</p>
      <p>Repo: {name}</p>
    </div>
  );
};

export default RepoPage;
