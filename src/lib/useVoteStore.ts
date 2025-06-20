import { useStore } from "@nanostores/react";
import {
  userProposalVoteStore,
  proposalTotalVoteStore,
  voteStoreActions,
  type VoteCounts,
} from "./voteStore";

export const useVoteStore = () => {
  const userVotes = useStore(userProposalVoteStore);
  const totalVotes = useStore(proposalTotalVoteStore);

  return {
    // State
    userVotes,
    totalVotes,

    // Bulk state management
    setInitialVoteState: (url: string, votes: VoteCounts) => {
      voteStoreActions.setVotes(userProposalVoteStore, url, votes);
    },
    resetVoteState: (url: string) => {
      // Get current votes
      const currentUserVotes = voteStoreActions.getProposalVotes(
        userProposalVoteStore,
        url
      );
      const currentProposalVotes = voteStoreActions.getProposalVotes(
        proposalTotalVoteStore,
        url
      );

      // Calculate initial proposal votes
      const initialProposalVotes = {
        upvote: currentProposalVotes.upvote - currentUserVotes.upvote,
        downvote: currentProposalVotes.downvote - currentUserVotes.downvote,
      };

      // Reset votes
      voteStoreActions.setVotes(userProposalVoteStore, url, {
        upvote: 0,
        downvote: 0,
      });
      voteStoreActions.setVotes(
        proposalTotalVoteStore,
        url,
        initialProposalVotes
      );
    },

    // Single vote management
    incrementUpvote: (url: string) => {
      voteStoreActions.incrementUpvote(proposalTotalVoteStore, url);
      voteStoreActions.incrementUpvote(userProposalVoteStore, url);
    },
    decrementUpvote: (url: string) => {
      voteStoreActions.decrementUpvote(proposalTotalVoteStore, url);
      voteStoreActions.decrementUpvote(userProposalVoteStore, url);
    },
    incrementDownvote: (url: string) => {
      voteStoreActions.incrementDownvote(proposalTotalVoteStore, url);
      voteStoreActions.incrementDownvote(userProposalVoteStore, url);
    },
    decrementDownvote: (url: string) => {
      voteStoreActions.decrementDownvote(proposalTotalVoteStore, url);
      voteStoreActions.decrementDownvote(userProposalVoteStore, url);
    },

    // Vote count management
    getProposalScore: (url: string) =>
      voteStoreActions.getProposalScore(proposalTotalVoteStore, url),
    getProposalVotes: (url: string) =>
      voteStoreActions.getProposalVotes(proposalTotalVoteStore, url),
    getUserProposalVotes: (url: string) =>
      voteStoreActions.getProposalVotes(userProposalVoteStore, url),
  };
};
