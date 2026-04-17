// hooks/useTeamManagement.js - Updated with rate limit handling
import { useTeam } from '../context/TeamContext';
import { useState, useCallback, useEffect } from 'react';

export const useTeamManagement = () => {
  const {
    teamMembers,
    teamStats,
    selectedMember,
    loading,
    error,
    pagination,
    fetchTeamMembers,
    fetchTeamStats,
    fetchTeamMemberById,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    updateMemberStatus,
    searchTeamMembers,
    setSelectedMember,
    clearError,
    clearCache,
  } = useTeam();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Handle search with debounce
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (value.trim()) {
        searchTeamMembers(value);
      } else {
        fetchTeamMembers(1, pagination.limit);
      }
    }, 800); // Increased debounce delay
    
    setSearchTimeout(timeout);
  }, [searchTeamMembers, fetchTeamMembers, pagination.limit, searchTimeout]);

  // Handle page change
  const handlePageChange = useCallback((event, newPage) => {
    fetchTeamMembers(newPage + 1, pagination.limit);
  }, [fetchTeamMembers, pagination.limit]);

  // Handle rows per page change
  const handleRowsPerPageChange = useCallback((event) => {
    const newLimit = parseInt(event.target.value, 10);
    fetchTeamMembers(1, newLimit);
  }, [fetchTeamMembers]);

  // Add member form handling
  const handleAddMember = useCallback(async (formData) => {
    setFormSubmitting(true);
    const result = await addTeamMember(formData);
    setFormSubmitting(false);
    
    if (result.success) {
      setModalOpen(false);
    }
    
    return result;
  }, [addTeamMember]);

  // Edit member
  const handleEditMember = useCallback(async (memberId, updateData) => {
    setFormSubmitting(true);
    const result = await updateTeamMember(memberId, updateData);
    setFormSubmitting(false);
    
    if (result.success) {
      setEditModalOpen(false);
      setMemberToEdit(null);
    }
    
    return result;
  }, [updateTeamMember]);

  // Delete member
  const handleDeleteMember = useCallback(async () => {
    if (!memberToDelete) return;
    
    setFormSubmitting(true);
    const result = await deleteTeamMember(memberToDelete.id, true);
    setFormSubmitting(false);
    
    if (result.success) {
      setDeleteConfirmOpen(false);
      setMemberToDelete(null);
    }
    
    return result;
  }, [deleteTeamMember, memberToDelete]);

  // Open edit modal
  const openEditModal = useCallback((member) => {
    setMemberToEdit(member);
    setEditModalOpen(true);
  }, []);

  // Open delete confirmation
  const openDeleteConfirm = useCallback((member) => {
    setMemberToDelete(member);
    setDeleteConfirmOpen(true);
  }, []);

  // View member details
  const viewMemberDetails = useCallback(async (memberId) => {
    return await fetchTeamMemberById(memberId);
  }, [fetchTeamMemberById]);

  // Get member by ID from list
  const getMemberById = useCallback((memberId) => {
    return teamMembers.find(m => m.id === memberId);
  }, [teamMembers]);

  // Retry failed request
  const handleRetry = useCallback(() => {
    clearCache();
    setRetryCount(prev => prev + 1);
    setTimeout(() => {
      fetchTeamMembers(1, pagination.limit);
      fetchTeamStats();
    }, 3000);
  }, [clearCache, fetchTeamMembers, fetchTeamStats, pagination.limit]);

  // Get performance color based on score
  const getPerformanceColor = useCallback((score) => {
    if (score >= 90) return '#10b981';
    if (score >= 75) return '#f59e0b';
    return '#ef4444';
  }, []);

  // Get status color
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#94a3b8';
      case 'onLeave': return '#f59e0b';
      default: return '#94a3b8';
    }
  }, []);

  // Format date
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  // Get avatar color based on name
  const getAvatarColor = useCallback((name) => {
    const colors = ['#bae6fd', '#cffafe', '#e0f2fe', '#dbeafe', '#f1f5f9'];
    const index = name?.length % colors.length || 0;
    return colors[index];
  }, []);

  // Get initials from name
  const getInitials = useCallback((firstName, lastName, email) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return '?';
  }, []);

  // Transform member for display
  const transformMember = useCallback((member) => {
    return {
      id: member.id,
      initials: getInitials(member.firstName, member.lastName, member.email),
      name: `${member.firstName || ''} ${member.lastName || ''}`.trim() || member.email?.split('@')[0] || 'Unknown',
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      role: member.teamRole || member.role,
      department: member.department,
      location: member.location,
      phone: member.phone,
      assigned: member.assignedCount || member.stats?.assignedCount || 0,
      completed: member.completedCount || member.stats?.totalInspections || 0,
      performance: member.performanceScore || member.stats?.performanceScore || 0,
      status: member.status || 'inactive',
      joinDate: member.joinDate,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      certifications: member.certifications || [],
      monthlyPerformance: member.monthlyPerformance || [],
      stats: member.stats,
    };
  }, [getInitials]);

  return {
    // State
    teamMembers,
    teamStats,
    selectedMember,
    loading,
    error,
    pagination,
    searchTerm,
    modalOpen,
    editModalOpen,
    deleteConfirmOpen,
    memberToDelete,
    memberToEdit,
    formSubmitting,
    retryCount,
    
    // Setters
    setModalOpen,
    setEditModalOpen,
    setDeleteConfirmOpen,
    setMemberToEdit,
    setSelectedMember,
    clearError,
    
    // Handlers
    handleSearch,
    handlePageChange,
    handleRowsPerPageChange,
    handleAddMember,
    handleEditMember,
    handleDeleteMember,
    openEditModal,
    openDeleteConfirm,
    viewMemberDetails,
    getMemberById,
    handleRetry,
    
    // Utilities
    getPerformanceColor,
    getStatusColor,
    formatDate,
    getAvatarColor,
    getInitials,
    transformMember,
  };
};