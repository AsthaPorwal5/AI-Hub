import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Message } from '../../types';
import { openaiService } from '../../services/openai';
import { geminiService } from '../../services/gemini';
import { claudeService } from '../../services/claude';
import { deepseekService } from '../../services/deepseek';

interface ChatProps {
  initialModel?: string;
  onBack?: () => void;
}

export const Chat: React.FC<ChatProps> = ({ initialModel = 'ChatGPT-4o', onBack }) => {
  const [model, setModel] = useState(initialModel);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Suggested chips
  const suggestionChips = [
    "What are its main features?",
    "Explain with an example",
    "How is it different from Flutter?"
  ];

  // Set initial message when model loads
  useEffect(() => {
    setModel(initialModel);
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: `Hello! I am ${initialModel.split(' ')[0]}. How can I help you today?`,
        timestamp: new Date(),
      },
    ]);
  }, [initialModel]);

  const handleSendText = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Scroll to bottom
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      let aiResponseText = '';
      if (model.includes('ChatGPT')) {
        aiResponseText = await openaiService.generateCompletion(text);
      } else if (model.includes('Gemini')) {
        aiResponseText = await geminiService.generateCompletion(text);
      } else if (model.includes('Claude')) {
        aiResponseText = await claudeService.generateCompletion(text);
      } else if (model.includes('DeepSeek')) {
        aiResponseText = await deepseekService.generateCompletion(text);
      } else {
        aiResponseText = `I am ${model.split(' ')[0]}. Here is a simulated response to your question.`;
      }

      const aiMessage: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    handleSendText(inputText);
    setInputText('');
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + strMinutes + ' ' + ampm;
  };

  // Model details helper for header
  const getModelDetails = () => {
    if (model.includes('ChatGPT')) return { title: 'ChatGPT', subtitle: 'GPT-4o', color: Colors.success };
    if (model.includes('Gemini')) return { title: 'Gemini', subtitle: 'Gemini 1.5 Pro', color: '#4285F4' };
    if (model.includes('Claude')) return { title: 'Claude', subtitle: 'Claude 3.5 Sonnet', color: Colors.warning };
    if (model.includes('DeepSeek')) return { title: 'DeepSeek', subtitle: 'DeepSeek-V3', color: Colors.secondary };
    return { title: model.split(' ')[0], subtitle: 'Active Model', color: Colors.primary };
  };

  const modelDetails = getModelDetails();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        {/* Header matching mockup */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerModelInfo}>
            <View style={[styles.modelBadge, { backgroundColor: modelDetails.color }]}>
              <Text style={styles.badgeLetter}>{modelDetails.title[0]}</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>{modelDetails.title}</Text>
              <Text style={styles.headerSubtitle}>{modelDetails.subtitle}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>•••</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  isUser ? styles.userRow : styles.aiRow,
                ]}
              >
                {!isUser && (
                  <View style={[styles.messageBadge, { backgroundColor: modelDetails.color }]}>
                    <Text style={styles.messageBadgeText}>{modelDetails.title[0]}</Text>
                  </View>
                )}
                
                <View style={styles.bubbleContainer}>
                  <View
                    style={[
                      styles.messageBubble,
                      isUser ? styles.userBubble : styles.aiBubble,
                    ]}
                  >
                    <Text style={styles.messageText}>{msg.text}</Text>
                    {isUser && (
                      <View style={styles.timeRow}>
                        <Text style={styles.timeText}>{formatTime(msg.timestamp)}</Text>
                        <Text style={styles.checksText}> ✓✓</Text>
                      </View>
                    )}
                  </View>

                  {/* Action row under AI message */}
                  {!isUser && (
                    <View style={styles.actionRow}>
                      <Text style={styles.timeTextLeft}>{formatTime(msg.timestamp)}</Text>
                      <View style={styles.actionsRight}>
                        <TouchableOpacity style={styles.actionBtn}>
                          <Text style={styles.actionIcon}>📋</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn}>
                          <Text style={styles.actionIcon}>👍</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn}>
                          <Text style={styles.actionIcon}>👎</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          })}

          {isTyping && (
            <View style={[styles.messageRow, styles.aiRow]}>
              <View style={[styles.messageBadge, { backgroundColor: modelDetails.color }]}>
                <Text style={styles.messageBadgeText}>{modelDetails.title[0]}</Text>
              </View>
              <View style={[styles.messageBubble, styles.aiBubble, styles.typingBubble]}>
                <Text style={styles.typingText}>Thinking...</Text>
              </View>
            </View>
          )}

          {/* Suggestion Chips */}
          {!isTyping && messages.length > 0 && (
            <View style={styles.chipsContainer}>
              {suggestionChips.map((chip, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.suggestionChip}
                  onPress={() => handleSendText(chip)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.chipText}>{chip}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask anything..."
            placeholderTextColor={Colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendIcon}>➔</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderCard,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerModelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modelBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeLetter: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    width: '100%',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  messageBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  messageBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bubbleContainer: {
    maxWidth: '80%',
  },
  messageBubble: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#582ECC', // Match the custom violet color in mockup
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#1C1F2D', // Match mockup bubble color
    borderWidth: 1,
    borderColor: Colors.borderCard,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 6,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
  },
  checksText: {
    color: Colors.secondary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  timeTextLeft: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginTop: 6,
  },
  actionsRight: {
    flexDirection: 'row',
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
  },
  actionIcon: {
    fontSize: 12,
    opacity: 0.6,
  },
  typingBubble: {
    opacity: 0.7,
  },
  typingText: {
    color: Colors.textMuted,
    fontSize: 13,
    fontStyle: 'italic',
  },
  chipsContainer: {
    marginTop: 8,
    marginBottom: 16,
    paddingLeft: 36, // Align with message text
  },
  suggestionChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: Colors.borderCard,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0F1322',
    borderTopWidth: 1,
    borderTopColor: Colors.borderCard,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 22,
    paddingHorizontal: 18,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    fontSize: 14,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
export default Chat;
