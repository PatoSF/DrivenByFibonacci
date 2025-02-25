// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IFiboVault {
    // Add these functions according to our fibo vault functions
    function setSubstageDuration(uint256 _duration) external;
    function setPrice(uint256 _newPrice) external;
    function mintToken(address _token) external;
}

contract FiboGovernance is Ownable {
    IERC20 public votingToken; // Governance token for voting power you can name it anything you wish i.e Fibo-G Token
    IFiboVault public fiboVault;
    
    struct Proposal {
        uint256 id;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        bool executed;
        address proposedBy;
        ProposalType proposalType;
        uint256 newValue;
        address newToken;
    }
    
    enum ProposalType { Substages, Price, MintToken }
    
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    event ProposalCreated(uint256 indexed id, string description, ProposalType proposalType, uint256 newValue, address newToken);
    event Voted(uint256 indexed proposalId, address voter, bool support, uint256 votes);
    event ProposalExecuted(uint256 indexed id);
    
    constructor(address _votingToken, address _fiboVault) {
        votingToken = IERC20(_votingToken);
        fiboVault = IFiboVault(_fiboVault);
    }
    
    function createProposal(string memory _description, ProposalType _type, uint256 _newValue, address _newToken) external {
        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            description: _description,
            votesFor: 0,
            votesAgainst: 0,
            deadline: block.timestamp + 7 days,
            executed: false,
            proposedBy: msg.sender,
            proposalType: _type,
            newValue: _newValue,
            newToken: _newToken
        });
        
        emit ProposalCreated(proposalCount, _description, _type, _newValue, _newToken);
    }
    
    function vote(uint256 _proposalId, bool support) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp < proposal.deadline, "Voting period ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");
        
        uint256 voterBalance = votingToken.balanceOf(msg.sender);
        require(voterBalance > 0, "No voting power");
        
        if (support) {
            proposal.votesFor += voterBalance;
        } else {
            proposal.votesAgainst += voterBalance;
        }
        
        hasVoted[_proposalId][msg.sender] = true;
        emit Voted(_proposalId, msg.sender, support, voterBalance);
    }
    
    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.deadline, "Voting period not ended");
        require(!proposal.executed, "Already executed");
        require(proposal.votesFor > proposal.votesAgainst, "Not enough support");
        
        if (proposal.proposalType == ProposalType.Substages) {
            fiboVault.setSubstageDuration(proposal.newValue);
        } else if (proposal.proposalType == ProposalType.Price) {
            fiboVault.setPrice(proposal.newValue);
        } else if (proposal.proposalType == ProposalType.MintToken) {
            fiboVault.mintToken(proposal.newToken);
        }
        
        proposal.executed = true;
        emit ProposalExecuted(_proposalId);
    }
}