import { supabase } from '../supabaseClient'

/**
 * Creates a new notification in the database for a specific user.
 * 
 * @param {Object} params
 * @param {string} params.userId - The UUID of the user.
 * @param {string} params.title - Notification title.
 * @param {string} params.message - Detailed message.
 * @param {string} params.type - Type: 'appointment', 'result', 'prescription', 'reminder', 'system'.
 */
export const addNotification = async ({ userId, title, message, type = 'system' }) => {
    if (!userId) {
        console.warn('Notification skipped: No userId provided.')
        return null
    }

    try {
        const { data, error } = await supabase
            .from('notifications')
            .insert([{
                user_id: userId,
                title,
                message,
                type
            }])
            .select()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error adding notification:', error.message)
        return null
    }
}
