import { atom } from "nanostores";

// Vote object type
export interface VoteCounts {
  upvote: number;
  downvote: number;
}

// Store for total votes across all users for each proposal
export const proposalTotalVoteStore = atom<Record<string, VoteCounts>>({});

// Store for current user's votes for each proposal
export const userProposalVoteStore = atom<Record<string, VoteCounts>>({});

// Shared methods for both stores
export const voteStoreActions = {
  // Set votes for a proposal
  setVotes: (
    store: typeof proposalTotalVoteStore | typeof userProposalVoteStore,
    url: string,
    votes: VoteCounts
  ) => {
    store.set({ ...store.get(), [url]: votes });
  },

  // Increment upvote for a proposal
  incrementUpvote: (
    store: typeof proposalTotalVoteStore | typeof userProposalVoteStore,
    url: string
  ) => {
    const current = store.get();
    const currentVotes = current[url] || { upvote: 0, downvote: 0 };
    store.set({
      ...current,
      [url]: {
        ...currentVotes,
        upvote: currentVotes.upvote + 1,
      },
    });
  },

  // Decrement upvote for a proposal
  decrementUpvote: (
    store: typeof proposalTotalVoteStore | typeof userProposalVoteStore,
    url: string
  ) => {
    const current = store.get();
    const currentVotes = current[url] || { upvote: 0, downvote: 0 };
    const newUpvoteCount = Math.max(0, currentVotes.upvote - 1);

    if (newUpvoteCount === 0 && currentVotes.downvote === 0) {
      // Remove the entry if both counts are 0
      const { [url]: _, ...rest } = current;
      store.set(rest);
    } else {
      store.set({
        ...current,
        [url]: {
          ...currentVotes,
          upvote: newUpvoteCount,
        },
      });
    }
  },

  // Increment downvote for a proposal
  incrementDownvote: (
    store: typeof proposalTotalVoteStore | typeof userProposalVoteStore,
    url: string
  ) => {
    const current = store.get();
    const currentVotes = current[url] || { upvote: 0, downvote: 0 };
    store.set({
      ...current,
      [url]: {
        ...currentVotes,
        downvote: currentVotes.downvote + 1,
      },
    });
  },

  // Decrement downvote for a proposal
  decrementDownvote: (
    store: typeof proposalTotalVoteStore | typeof userProposalVoteStore,
    url: string
  ) => {
    const current = store.get();
    const currentVotes = current[url] || { upvote: 0, downvote: 0 };
    const newDownvoteCount = Math.max(0, currentVotes.downvote - 1);

    if (newDownvoteCount === 0 && currentVotes.upvote === 0) {
      // Remove the entry if both counts are 0
      const { [url]: _, ...rest } = current;
      store.set(rest);
    } else {
      store.set({
        ...current,
        [url]: {
          ...currentVotes,
          downvote: newDownvoteCount,
        },
      });
    }
  },

  // Get total votes for a proposal
  getProposalScore: (
    store: typeof proposalTotalVoteStore | typeof userProposalVoteStore,
    url: string
  ): number => {
    const current = store.get();
    const upvotes = current[url]?.upvote || 0;
    const downvotes = current[url]?.downvote || 0;
    return upvotes - downvotes;
  },

  getProposalVotes: (
    store: typeof proposalTotalVoteStore | typeof userProposalVoteStore,
    url: string
  ): VoteCounts => {
    const current = store.get();
    return current[url] || { upvote: 0, downvote: 0 };
  },

  getTotalVotesCastAcrossAllProposals: (
    store: typeof proposalTotalVoteStore | typeof userProposalVoteStore
  ): number => {
    const current = store.get();
    return Object.values(current).reduce(
      (sum, votes) => sum + votes.upvote + votes.downvote,
      0
    );
  },
};
